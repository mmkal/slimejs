import request = require("request-promise");
import fs = require("fs");
import path = require("path");
import webpack = require("webpack");
import { exec } from "shelljs";

import preprocessJava from "./preprocess-java";
import postprocessTypeScript from "./postprocess-ts";

const webpackConfig: webpack.Configuration = require(path.join(process.cwd(), "webpack.config.js"));

// const foo = exec("git status");

(async function() {
    const dirname = "original-java";
    const games = fs.readdirSync(dirname);
    for (const gamePath of games) {
        process.stdout.write(`Transpiling ${gamePath}... `);
        const tsPath = await transpileJavaGame(gamePath, dirname);
        console.log(tsPath + " created.");
    }
    const indexPath = "generated-ts/games.ts";
    console.log(`TypeScript transpilation done. Creating index file ${indexPath}...`);
    const indexModule = games.map(g => `import ${g} from "./${g}";`).join("\r\n") + `\r\nexport default { ${games.join(", ")} };`;
    fs.writeFileSync("generated-ts/games.ts", indexModule, "utf8");
    console.log(indexPath + " created.");

    console.log("Running webpack...");
    await new Promise(resolve => webpack(webpackConfig).run(resolve));
    console.log("Webpack finished.");


    console.log("Exiting.");
    process.exit(0);
})();

async function transpileJavaGame(filename: string, dirname?: string) {
    const javaGamePath = dirname ? path.join(dirname, filename) : filename;
    const originalJava = fs
        .readdirSync(javaGamePath)
        .filter(f => f.endsWith(".java"))
        .map(j => fs.readFileSync(path.join(javaGamePath, j), "utf8"))
        .sort((leftCode, rightCode) => leftCode.indexOf(" extends ") - rightCode.indexOf(" extends "))
        .join("\r\n\r\n");

    const transpilableJava = preprocessJava(originalJava);
    
    const tsPath = path.join("generated-ts", filename + ".ts");
    if (!fs.existsSync(path.dirname(tsPath))) {
        fs.mkdirSync(path.dirname(tsPath));
    }

    let response: string = null;
    const cached = tsPath.replace(/\.ts$/, ".cachedresponse.txt");
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