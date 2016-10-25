import matches from "./regex";

export default function cleanUpTranspiledTypeScript(ts: string) {
    const marker = "class EndOfShimDeclarations {}";
    const markerStart = ts.indexOf(marker);
    if (markerStart > -1) ts = ts.substring(markerStart + marker.length, ts.length).trim();

    const parts = ts.split(/\bclass\b/g);
    for (let i = 0; i < parts.length; i++) {
        let ps = parts[i];

        ps = ps.replace(/\bprivate\b/g, "public");

        // horribly nasty thing. TypeScript and Java think very different things about "char"s.
        // This attempts to find chars that are likely to be used like ints, and turns them into ints.
        // then it finds ternaries that try to get charCodeAt(0) from what TypeScript calls a "string | number".
        ps = ps.replace(/'\\u[0-9A-Za-z]{4}'/g, m => "String(" + eval(m + ".charCodeAt(0)") + ")"); 
        ps = ps.replace(/(\d+)(:String\(\d+\).{1,3}\.charCodeAt\(0\))/g, (m, g1, g2) => `String(${g1})${g2}`);
        ps = ps.replace(/(String\(\d+\):)(\d+)(.{1,3}\.charCodeAt\(0\))/g, (m, g1, g2, g3) => `${g1}String(${g2})${g3}`);

        ps = asyncify(ps);

        ps = ps.replace(/Color\.(\w+)/g, (m, g1) => `Color.fromString("${g1}")`);

        parts[i] = ps;
    }

    ts = parts.join("class");

    const imports = new Set<string>();
    ts = ts.replace(/\bShimmed(\w+)\b/g, (m, g1) => {
        imports.add(g1);
        return g1;
    });

    ts = `import { ${Array.from(imports).join(", ")} } from "../client-ts/AppletShims"\r\n\r\n${ts}`;

    ts = ts.replace(/\bclass (\w+ extends Applet)\b/, (m, g1) => "export default class " + g1);

    ts = ts.replace(/throw new Error[^\n]*server[^\n]*/g, "// Don't worry about it.");

    return ts;
}

function asyncify(ts: string) {
    const functionMatcher = /public ([\w$]+)\(.*\)/g;

    const declarations = { };
    const methods = matches(ts, functionMatcher).map(m => m[1]);
    matches(ts, functionMatcher).forEach(m => declarations[m[1]] = m[0]);

    function getBody(funcName: string) {
        const declaration: string = declarations[funcName];
        const start = ts.indexOf(declaration);
        if (start === -1) throw new Error("Method not found: " + funcName);
        if (start !== ts.lastIndexOf(declaration)) throw new Error("Multiple declarations of: " + declaration);

        let braceCount = 0;
        let end = -1;
        for (let i = start; i < ts.length; i++) {
            const ch = ts[i];
            if (ch == "{") {
                braceCount++;
            }
            else if (ch == "}") {
                braceCount--;
                if (braceCount == 0) {
                    end = i;
                    break;
                }
            }
        }
        if (end === -1) throw new Error("Couldn't find end of function body for: " + declaration);
        return ts.substring(start + declaration.length, end);
    }

    const awaitableExpressions = [ /ShimmedThread\.sleep\(\d+\)/g ];
    const handledMethods = new Set<string>();
    const replacements = { };

    function asyncifyMethod(m) {
        const pattern = escapeRegExp(`this.${m}(`) + ".*?" + escapeRegExp(")");
        const expression = new RegExp(pattern, "g");
        awaitableExpressions.push(expression);
        
        handledMethods.add(m);
        
        const declaration = declarations[m];
        if (declaration) {
            replacements[declaration] = declaration.replace("public", "public async"); 
        }
    }

    function escapeRegExp(str) {
       return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    

    ts.indexOf("handleEvent") > -1 && asyncifyMethod("handleEvent");

    while (awaitableExpressions.length > 0) {
        const regexp = awaitableExpressions.pop();
        
        const affectedMethods = methods.filter(m => regexp.test(getBody(m)) && !handledMethods.has(m));
        affectedMethods.forEach(asyncifyMethod);

        ts = ts.replace(regexp, m => "await " + m);
        ts = ts.replace("await await", "await");
        ts = ts.replace(/(<\S+>)await /g, (m, g1) => "await " + g1);
    }

    for (let declaration in replacements) {
        ts = ts.replace(declaration, replacements[declaration]);
    }

    ts = ts.replace(/(public async .+\(.*\)) : (.+) {/g, (m, declaration, returnType) => `${declaration} : Promise<${returnType}> {`);

    return ts;
}