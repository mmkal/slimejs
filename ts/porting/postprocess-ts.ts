import matches from "../util/regex";

export default function cleanUpTranspiledTypeScript(ts: string) {
    const marker = "class EndOfShimDeclarations {}";
    const markerStart = ts.indexOf(marker);
    if (markerStart > -1) ts = ts.substring(markerStart + marker.length, ts.length).trim();

    const parts = ts.split(/\bclass\b/g);
    for (let i = 0; i < parts.length; i++) {
        let ps = parts[i];

        ps = ps.replace(/\bprivate\b/g, "public");

        ps = ps.replace(/\^=/g, "!=");

        ps = asyncify(ps);

        ps = ps.replace(/Color\.(\w+)/g, (m, g1) => `Color.fromString("${g1}")`);

        ps = ps.replace(/<number>(\w+?\[\w+?\])/g, (m, g1) => `(${g1}.charCodeAt(0))`)

        const getHostCalls = matches(ps, /this\.getDocumentBase\(\)\.getHost\(\)/g).forEach(m => {
            const comparisonStart = ps.indexOf(`"`, m.index);
            const comparisonEnd = ps.indexOf(`"`, comparisonStart + 1) + 1;
            const comparison = ps.substring(comparisonStart, comparisonEnd);
            ps = ps.replace(m[0], comparison);
        });

        parts[i] = ps;
    }

    ts = parts.join("class");

    const imports = new Set<string>();
    ts = ts.replace(/\bShimmed(\w+)\b/g, (m, g1) => {
        imports.add(g1);
        return g1;
    });

    ts = `import { ${Array.from(imports).join(", ")} } from "../../ts/client/shims"\r\n\r\n${ts}`;

    ts = ts.replace(/\bclass (\w+ extends Applet)\b/, (m, g1) => "export default class " + g1);

    ts = ts.replace(/throw new Error[^\n]*server[^\n]*/g, "// Don't worry about it.");

    return ts;
}

function asyncify(ts: string) {
    const declarations = { };
    const methods = new Array<string>();
    matches(ts, /\n    (public |private )?(\w+)\(.*?\)( : \w+)? {/g).forEach(m => {
        methods.push(m[2]);
        declarations[m[2]] = m[0];
    });

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
            replacements[declaration] = declaration.replace(m, "async " + m); 
        }
    }

    function escapeRegExp(str) {
       return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    

    ts.indexOf("handleEvent") > -1 && asyncifyMethod("handleEvent");

    asyncifyMethod("run");

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

    ts = ts.replace(/(async .+\(.*\)) : (.+) {/g, (m, declaration, returnType) => `${declaration} : Promise<${returnType}> {`);

    return ts;
}