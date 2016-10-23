import request = require("request-promise");
import fs = require("fs");
import path = require("path");
import webpack = require("webpack");

(async function() {
    const javaGames = "original-java/soccer".split(" ")
    for (const gamePath of javaGames) {
        await transpileJavaGame(gamePath);
    }
    console.log("Success.");
    process.exit(0);
})();

function getTranspilableJava(java: string) {
    const appletShims = fs.readFileSync("transpilation/AppletShims.java", "utf8");

    const shimmableClasses = allMatches(appletShims, /public (class|interface) (\w+)/g).map(m => m[2]);

    java = java.replace(/(do)([^{]+?)(while)/g, (match, g1, g2, g3) => `${g1} { ${g2} } ${g3}`);

    java = java.replace(/import .*;/g, "");

    java = appletShims + "\r\n\r\n" + "public class EndOfShimDeclarations{}" + "\r\n" + java;

    shimmableClasses.forEach(c => {
        const exactWord = new RegExp("\\b" + c + "\\b", "g");
        java = java.replace(exactWord, "Shimmed" + c);
    });

    return java;
}

function asyncify(ts: string) {
    const functionMatcher = /public ([\w$]+)\(.*\)/g;

    const declarations = { };
    const methods = allMatches(ts, functionMatcher).map(m => m[1]);
    allMatches(ts, functionMatcher).forEach(m => declarations[m[1]] = m[0]);

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

    while (awaitableExpressions.length > 0) {
        const regexp = awaitableExpressions.pop();
        const affectedMethods = methods.filter(m => regexp.test(getBody(m)) && !handledMethods.has(m));

        affectedMethods
            .map(m => new RegExp("this\\." + m + "\\(.*\\)", "g"))
            .forEach(r => awaitableExpressions.push(r));

        affectedMethods.forEach(m => handledMethods.add(m));

        affectedMethods
            .map(m => declarations[m])
            .forEach(d => replacements[d] = d.replace("public", "public async"));

        ts = ts.replace(regexp, m => "await " + m);
        ts = ts.replace("await await", "await");
    }

    for (let declaration in replacements) {
        ts = ts.replace(declaration, replacements[declaration]);
    }

    ts = ts.replace(/(public async .+\(.*\)) : (.+) {/g, (m, declaration, returnType) => `${declaration} : Promise<${returnType}> {`);

    return ts;
}

function cleanUpTranspiledTypeScript(ts: string) {
    const marker = "class EndOfShimDeclarations {}";
    const markerStart = ts.indexOf(marker);
    if (markerStart === -1) throw new Error("Marker code not found");
    ts = ts.substring(markerStart + marker.length, ts.length).trim();

    ts = ts.replace(/\bprivate\b/g, "public");

    ts = asyncify(ts);

    ts = ts.replace(/Color\.(\w+)/g, (m, g1) => `Color.fromString("${g1}")`);

    const imports = Array.from(new Set(allMatches(ts, /Shimmed\w+\b/g).map(m => m.toString()))).join(", ");

    ts = `import { ${imports} } from "../client-ts/AppletShims"\r\n\r\n${ts}`;

    return ts;
}

async function transpileJavaGame(javaGamePath: string) {
    const originalJava = fs.readdirSync(javaGamePath).map(j => fs.readFileSync(path.join(javaGamePath, j), "utf8")).join("\r\n\r\n");

    const transpilableJava = getTranspilableJava(originalJava);
    
    const tsPath = path.join("generated-ts", javaGamePath.replace("original-java/", "") + ".ts");
    if (!fs.existsSync(path.dirname(tsPath))) {
        fs.mkdirSync(path.dirname(tsPath));
    }

    let response: string = null;
    const cached = tsPath + ".cachedresponse.txt";
    if (fs.existsSync(cached)) {
        response = fs.readFileSync(cached, "utf8");
    } else {
        response = await request.post("http://sandbox.jsweet.org/transpile", { form: { javaCode: transpilableJava, tsout: true } });
        fs.writeFileSync(cached, response, "utf8");
    }

    const transpilation = JSON.parse(response);
    if (transpilation.success) {
        const ts = cleanUpTranspiledTypeScript(transpilation.tsout);
        fs.writeFileSync(tsPath, ts, "utf8");
    } else {
        if (transpilation.tsout) fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.ts"), transpilation.tsout, "utf8");
        else fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.java"), transpilableJava, "utf8");
        throw new Error(transpilation.errors.join("\r\n"));
    }
}

function allMatches(input: string, regexp: RegExp) {
    const matches = new Array<RegExpExecArray>();
    let match: RegExpExecArray;
    while (match = regexp.exec(input)) {
        matches.push(match);
    }
    return matches;
}