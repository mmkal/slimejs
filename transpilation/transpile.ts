import request = require("request-promise");
import fs = require("fs");
import path = require("path");
import webpack = require("webpack");

import preprocessJava from "./preprocess-java";
import postprocessTypeScript from "./postprocess-ts";

const webpackConfig: webpack.Configuration = require(path.join(process.cwd(), "webpack.config.js"));

(async function() {
    const javaGames = "original-java/volleyball original-java/tennis original-java/cricket original-java/soccer".split(" ")
    for (const gamePath of javaGames) {
        process.stdout.write(`Transpiling ${gamePath}... `);
        const tsPath = await transpileJavaGame(gamePath);
        console.log(tsPath + " created.");
    }
    console.log("TypeScript transpilation done.");

    console.log("Running webpack...");
    await new Promise(resolve => webpack(webpackConfig).run(resolve));
    console.log("Webpack finished.");


    console.log("Exiting.");
    process.exit(0);
})();

async function transpileJavaGame(javaGamePath: string) {
    const originalJava = fs
        .readdirSync(javaGamePath)
        .filter(f => f.endsWith(".java"))
        .map(j => fs.readFileSync(path.join(javaGamePath, j), "utf8"))
        .sort((leftCode, rightCode) => leftCode.indexOf(" extends ") - rightCode.indexOf(" extends "))
        .join("\r\n\r\n");

    const transpilableJava = preprocessJava(originalJava);
    
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
        const ts = postprocessTypeScript(transpilation.tsout);
        fs.writeFileSync(tsPath, ts, "utf8");
    } catch (e) {
        fs.unlinkSync(cached);
        fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.java"), transpilableJava, "utf8");
        
        if (transpilation.tsout) fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.ts"), transpilation.tsout, "utf8");
        
        const errors: string = transpilation && transpilation.errors && transpilation.errors.join("\r\n");
        console.error(e + "\r\n" + errors);
        throw new Error(e + "\r\n" + errors);
    }

    return tsPath;
}