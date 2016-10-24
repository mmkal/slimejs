import request = require("request-promise");
import fs = require("fs");
import path = require("path");
import webpack = require("webpack");

// const sillyname = require("sillyname");
// function c() {
//     let n = sillyname();
//     n = n.split(" ").join("");
//     return n;
// }
// function m() {
//     const n = c();
//     return n[0].toLowerCase() + n.substring(1);
// }
// var names = new Array<string>();
// for (let i = 0; i < 1000; i++) {
//     console.log(c());
// }
// process.exit();

(async function() {
    const javaGames = "original-java/tennis".split(" ")
    for (const gamePath of javaGames) {
        await transpileJavaGame(gamePath);
    }
    console.log("Success.");
    process.exit(0);
})();

async function transpileJavaGame(javaGamePath: string) {
    const originalJava = fs
        .readdirSync(javaGamePath)
        .map(j => fs.readFileSync(path.join(javaGamePath, j), "utf8"))
        .sort((leftCode, rightCode) => leftCode.indexOf(" extends ") - rightCode.indexOf(" extends "))
        .join("\r\n\r\n");

    const transpilableJava = getTranspilableJava(originalJava);
    const lines = transpilableJava.split("\n").length;
    
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
    try {
        if (!transpilation.tsout) throw new Error("Transiplation failed");
        const ts = cleanUpTranspiledTypeScript(transpilation.tsout);
        fs.writeFileSync(tsPath, ts, "utf8");
    } catch (e) {
        fs.unlinkSync(cached);
        fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.java"), transpilableJava, "utf8");
        
        if (transpilation.tsout) fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.ts"), transpilation.tsout, "utf8");
        
        const errors: string = transpilation && transpilation.errors && transpilation.errors.join("\r\n");
        console.error(e + "\r\n" + errors);
        throw new Error(e + "\r\n" + errors);
    }
}

function getTranspilableJava(java: string) {
    const appletShims = fs.readFileSync("transpilation/AppletShims.java", "utf8");

    const shimmableClasses = allMatches(appletShims, /public (class|interface) (\w+)/g).map(m => m[2]);

    java = java.replace(/(\bdo\b)([^{]+?)(while)/g, (match, g1, g2, g3) => `${g1} { ${g2} } ${g3}`);

    java = java.replace(/\bcase\b '(.)'/g, (m, ch: string) => `case ${ch.charCodeAt(0)}`);

    java = java.replace(/\w+\.sleep\b/g, "ShimmedThread.sleep"); // nasty. Java can call static methods from instances, but the transpiler doesn't like it.

    java = java.replace(/(new int\b ?)\[\w+\](?!(\[))/g, (m, g1) => `${g1}[0]`); // char/int auto-conversion in Java doesn't work in TS. But we also don't need to give arrays an initial size.

    java = java.replace(/(\w+).toCharArray\(\)/g, (m, g1) => `ShimmedChars.charCodeArray(${g1})`);
    java = java.replace(/\bchar\b([^\n]+ = ShimmedChars.charCodeArray)/g, (m, g1) => `int${g1}`);

    java = java.replace(/import .*;/g, "");

    java = java.replace(/package .*;/g, "");

    java = appletShims + "\r\n\r\n" + "public class EndOfShimDeclarations{}" + "\r\n" + java;

    shimmableClasses.forEach(c => {
        const exactWord = new RegExp("\\b" + c + "\\b", "g");
        java = java.replace(exactWord, "Shimmed" + c);
    });

    if (java.length > 100 * 1000) {
        const newLineMarker = Date.now() + "NEWLINE" + Date.now();
        java = java.replace(/\s*\n\s*/g, newLineMarker);
        java = java.replace(/\s+/g, " ");
        java = java.split(newLineMarker).join("\n");
    }

    if (java.length > 100 * 1000) {
        throw new Error("Java code too long");
    }

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

function cleanUpTranspiledTypeScript(ts: string) {
    const marker = "class EndOfShimDeclarations {}";
    const markerStart = ts.indexOf(marker);
    if (markerStart > -1) ts = ts.substring(markerStart + marker.length, ts.length).trim();

    const parts = ts.split(/\bclass\b/g);
    for (let i = 0; i < parts.length; i++) {
        let ps = parts[i];

        ps = ps.replace(/\bprivate\b/g, "public");

        ps = asyncify(ps);

        ps = ps.replace(/Color\.(\w+)/g, (m, g1) => `Color.fromString("${g1}")`);

        parts[i] = ps;
    }

    ts = parts.join("class");

    const imports = Array.from(new Set(allMatches(ts, /Shimmed\w+\b/g).map(m => m.toString()))).join(", ");

    ts = `import { ${imports} } from "../client-ts/AppletShims"\r\n\r\n${ts}`;

    ts = ts.replace(/\bclass (\w+ extends ShimmedApplet)\b/, (m, g1) => "export default class " + g1);

    return ts;
}

function allMatches(input: string, regexp: RegExp) {
    const matches = new Array<RegExpExecArray>();
    let match: RegExpExecArray;
    while (match = regexp.exec(input)) {
        matches.push(match);
    }
    return matches;
}