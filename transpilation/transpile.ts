import request = require("request-promise");
import fs = require("fs");
import path = require("path");
import webpack = require("webpack");

(async function() {
    const javaGames = "original-java/WorldCupSoccerSlime.java".split(" ")
    for (const gamePath of javaGames) {
        await transpileJavaGame(gamePath);
    }
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

/** Basic algorithm for making methods that need to be async, async */
function asyncify(ts: string) {
    const parts = ts.split("EndOfShimDeclarations");
    ts = parts[1];
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
    const replacements = { };

    while (awaitableExpressions.length > 0) {
        const regexp = awaitableExpressions.pop();
        const affectedMethods = methods.filter(m => {
            const body = getBody(m);
            return regexp.test(body);
            // regexp.test(getBody(m))
        });

        affectedMethods
            .map(m => new RegExp("this\\." + m + "\\(.*\\)", "g"))
            .filter(r => awaitableExpressions.every(e => e.source !== r.source))
            .forEach(r => awaitableExpressions.push(r));

        affectedMethods
            .map(m => declarations[m])
            .forEach(d => replacements[d] = d.replace("public", "public async"));

        ts = ts.replace(regexp, m => "await " + m);
    }

    for (let declaration in replacements) {
        ts = ts.replace(declaration, replacements[declaration]);
    }

    parts[1] = ts;

    ts = parts.join("EndOfShimDeclarations");

    return ts;
}

function cleanUpTranspiledTypeScript(ts: string) {
    const voidFunctions = /public (.+?\(.*?\) {)/g;
    const nonVoidFunctions = /public (.+?\(.*?\) : )(.*?)( {)/g;
    const asyncConstructors = /async constructor\(/g;
    const sleeps = /ShimmedThread\.sleep\((\d+)\);/g;
    const thisMethodCalls = /this\.(\w+)\(/g;
    const colours = /Color\.(\w+)/g
    const privates = /\bprivate\b/g;
    const shimmedClasses = /Shimmed\w+\b/g;

    ts = ts.replace(privates, "public");
    
    // ts = ts.replace(voidFunctions, (m, g1, g2) => `${g1} async ${g2}`);
    // ts = ts.replace(nonVoidFunctions, (m, g1, g2, g3, g4) => `${g1} async ${g2} Promise<${g3}> ${g4}`);
    // ts = ts.replace(asyncConstructors, "constructor(");

    fs.writeFileSync("foo.ts.txt", ts, "utf8");

    ts = asyncify(ts);
    // ts = ts.replace(sleeps, m => `await ${m}`);

    // ts = ts.replace(thisMethodCalls, m => `await ${m}`);
//    ts = ts.replace(thisMethodCalls, (m, g1) => ts.indexOf("async " + g1) > -1 ? `await ${m}` : m.toString());

    ts = ts.replace(colours, (m, g1) => `Color.fromString("${g1}")`);

    const marker = "class EndOfShimDeclarations {}";

    const markerStart = ts.indexOf(marker);

    if (markerStart === -1) throw new Error("Marker code not found");

    ts = ts.substring(markerStart + marker.length, ts.length).trim();

    const imports = Array.from(new Set(allMatches(ts, shimmedClasses).map(m => m.toString()))).join(", ");

    ts = `import { ${imports} } from "../client-ts/AppletShims"\r\n\r\n${ts}`;

    return ts;
}

async function transpileJavaGame(javaGamePath: string) {
    const java = getTranspilableJava(fs.readFileSync(javaGamePath, "utf8"));

    let response: string = null;
    if (fs.existsSync("cachedresponse.txt")) {
        response = fs.readFileSync("cachedresponse.txt", "utf8");
    } else {
        response = await request.post("http://sandbox.jsweet.org/transpile", { form: { javaCode: java, tsout: true } });
        fs.writeFileSync("cachedresponse.txt", response, "utf8");
    }

    const transpilation = JSON.parse(response);
    if (transpilation.success) {
        const ts = cleanUpTranspiledTypeScript(transpilation.tsout);
        const tsPath = javaGamePath.replace("original-java/", "generated-ts/").replace(".java", ".ts");
        if (!fs.existsSync(path.dirname(tsPath))) {
            fs.mkdirSync(path.dirname(tsPath));
        }
        fs.writeFileSync(tsPath, ts, "utf8");
    } else {
        if (transpilation.tsout) fs.writeFileSync("generated-ts/failure.ts", transpilation.tsout, "utf8");
        else fs.writeFileSync("generated-ts/failure.java", java, "utf8");
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