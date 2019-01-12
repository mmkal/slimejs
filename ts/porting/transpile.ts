import request = require("request-promise");
import fs = require("fs");
import path = require("path");
import webpack = require("webpack");

import paths from "./paths";
import preprocessJava from "./preprocess-java";
import postprocessTypeScript from "./postprocess-ts";
import { defineBuildScript } from "../util/cmd";

const webpackConfig: webpack.Configuration = require(path.join(process.cwd(), "webpack.config.js"));

defineBuildScript(module, findAndTranspileAll);

async function findAndTranspileAll() {
    const dirname = paths.decompiledDir;
    const games = fs.readdirSync(dirname);
    for (const gamePath of games) {
        process.stdout.write(`Transpiling ${gamePath}... `);
        try {
            const tsPath = await transpileJavaGame(gamePath, dirname);
            console.log(tsPath + " created.");
        }
        catch (e) {
            console.error(`Transpiling ${gamePath} failed:`);
            console.error(e);
        }
    }
    const indexPath = path.join(paths.generatedTypeScript, "games-index.ts");
    console.log(`TypeScript transpilation done. Creating index file ${indexPath}...`);
    const gameImports = games
        .filter(g => fs.existsSync(path.join(paths.generatedTypeScript, g + ".ts")))
        .map(g => { 
            return {moduleName: g, varName: g.replace(/-/g, "_") }
        });

    const indexModule = gameImports.map(g => `import ${g.varName} from "./${g.moduleName}";`).join("\r\n") + `\r\nexport default { ${gameImports.map(g => g.varName).join(", ")} };`;
    
    fs.writeFileSync(indexPath, indexModule, "utf8");
    console.log(indexPath + " created.");

    console.log("Running webpack...");
    const f = await new Promise(resolve => webpack(webpackConfig).run(() => {
        console.dir(arguments);
        resolve()
    }));
    console.log("Webpack finished.");
}

async function transpileJavaGame(filename: string, dirname?: string) {
    const javaGamePath = dirname ? path.join(dirname, filename) : filename;
    const originalJava = fs
        .readdirSync(javaGamePath)
        .filter(f => f.endsWith(".java"))
        .map(j => fs.readFileSync(path.join(javaGamePath, j), "utf8"))
        .sort((leftCode, rightCode) => leftCode.indexOf(" extends ") - rightCode.indexOf(" extends "))
        .join("\r\n\r\n");

    const attributesFile = path.join(paths.compiledDir, path.basename(javaGamePath), paths.attributesFile);
    const attributes = JSON.parse(fs.readFileSync(attributesFile, "utf8"));

    const transpilableJava = preprocessJava(originalJava);
    
    const tsPath = path.join(paths.generatedTypeScript, filename + ".ts");
    if (!fs.existsSync(path.dirname(tsPath))) {
        fs.mkdirSync(path.dirname(tsPath));
    }

    let response: string = null;
    const cacheFile = tsPath.replace(/\.ts$/, ".cachedresponse.txt");
    const endOfJavaMarker = "\nENDOFJAVAMARKER\n";
    if (fs.existsSync(cacheFile)) {
        const cache = fs.readFileSync(cacheFile, "utf8");
        const parts = cache.split(endOfJavaMarker);
        response = (parts[0] === transpilableJava) ? parts[1] : null;
    } 
    
    if (!response) {
        response = await request.post("http://sandbox.jsweet.org/transpile", { form: { javaCode: transpilableJava, tsout: true } });
        fs.writeFileSync(cacheFile, transpilableJava + endOfJavaMarker + response, "utf8");
    }

    const transpilation = JSON.parse(response);
    try {
        if (!transpilation.tsout) throw new Error("Transiplation failed");
        const ts = postprocessTypeScript(transpilation.tsout, `public recommended_width = ${attributes.width};`, `public recommended_height = ${attributes.height};`);
        fs.writeFileSync(tsPath, ts, "utf8");
    } catch (e) {
        fs.unlinkSync(cacheFile);
        fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.java"), transpilableJava, "utf8");
        
        if (transpilation.tsout) fs.writeFileSync(tsPath.replace(/\.ts$/, ".fail.ts"), transpilation.tsout, "utf8");
        
        const errors: string = transpilation && transpilation.errors && transpilation.errors.join("\r\n");
        throw new Error(e + "\r\n" + errors);
    }

    return tsPath;
}