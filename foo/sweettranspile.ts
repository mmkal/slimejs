import request = require("request-promise");
import fs = require("fs");
import path = require("path");

(async function() {
    const javaGames = "java/WorldCupSoccerSlime.java".split(" ")
    for (const gamePath of javaGames) {
        await transpileJavaGame(gamePath);
    }
})();

function getTranspilableJava(java: string) {
    const appletShims = fs.readFileSync("foo/AppletShims.java", "utf8");

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

function cleanUpTranspiledTypeScript(ts: string) {
    const voidFunctions = /(public|private) (.+?\(.*?\) {)/g;
    const nonVoidFunctions = /(public|private) (.+?\(.*?\) : )(.*?)( {)/g;
    const sleeps = /ShimmedThread\.sleep\((\d+)\);/g;
    const thisMethodCalls = /this\.\w+\(/g;
    const colours = /Color\.(\w+)/g
    
    ts = ts.replace(voidFunctions, (m, g1, g2) => `${g1} async ${g2}`);

    ts = ts.replace(nonVoidFunctions, (m, g1, g2, g3, g4) => `${g1} async ${g2} Promise<${g3}> ${g4}`);

    ts = ts.replace(sleeps, m => `await ${m}`);

    ts = ts.replace(thisMethodCalls, m => `await ${m}`);

    ts = ts.replace(colours, (m, g1) => `Color.fromString("${g1}")`);

    const marker = "class EndOfShimDeclarations {}";

    const markerStart = ts.indexOf(marker);

    if (markerStart === -1) throw new Error("Marker code not found");

    ts = ts.substring(markerStart + marker.length, ts.length).trim();

    return ts;
}

async function transpileJavaGame(javaGamePath: string) {
    const java = getTranspilableJava(fs.readFileSync(javaGamePath, "utf8"));
    const response = await request.post("http://sandbox.jsweet.org/transpile", { form: { javaCode: java, tsout: true } });
    const transpilation = JSON.parse(response);
    if (transpilation.success) {
        const ts = cleanUpTranspiledTypeScript(transpilation.tsout);
        const tsPath = javaGamePath.replace("java/", "ts/").replace(".java", ".ts");
        fs.writeFileSync(tsPath, ts, "utf8");
    } else {
        throw new Error(transpilation);
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