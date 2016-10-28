import fs = require("fs");
import path = require("path");

import shell = require("shelljs");
import cmd from "../util/cmd";
import paths from "./paths"

if (require.main === module) {
    decompile();
    process.exit();
}

function decompile() {
    const customRenamer = "LosslessRenamer";
    const renamerSourceFile = path.join("java", customRenamer + ".java");
    const renamerClassPath = path.resolve(path.join(paths.compiledDir, "renamer"));

    const fernflower = path.resolve("node_modules/fernflower/fernflower.jar");

    shell.mkdir("-p", renamerClassPath);
    cmd(`javac -classpath ${fernflower} ${renamerSourceFile} -d ${renamerClassPath}`);
    
    const renamerClassFile = path.join(renamerClassPath, customRenamer + ".class");
    if (!fs.existsSync(renamerClassFile)) throw new Error("Renamer class missing. Should be at: " + renamerClassFile);

    shell.mkdir("-p", paths.decompiledDir);
    
    const games = fs.readdirSync(paths.compiledDir).filter(p => path.resolve(path.join(paths.compiledDir, p)) !== path.resolve(renamerClassPath));
    const classes = games.map(g => {
        const files = fs.readdirSync(path.join(paths.compiledDir, g)).filter(p => path.basename(p) !== paths.attributesFile);
        if (files.length !== 1) {
            console.error(`Unexpected number of files in ${g}: ${files.join(", ")}`);
            return null;
        }
        return path.join(paths.compiledDir, g, files[0]);
    }).filter(f => f);

    let sudoWorks: boolean;
    try {
        cmd("sudo");
        sudoWorks = true;
    } catch (e) {
        sudoWorks = false;
    }
    
    classes.forEach(input => {
        const inputDir = path.dirname(input);
        const outputDir = path.join(paths.decompiledDir, path.basename(inputDir)); //path.resolve(inputDir.replace(path.resolve(paths.compiledDir), paths.decompiledDir));
        if (inputDir === outputDir) throw new Error("Input dir should be different from output dir. Both are: " + inputDir);
        
        const attributesJson = fs.readFileSync(path.join(inputDir, paths.attributesFile), "utf8");
        const attributes = JSON.parse(attributesJson);

        shell.mkdir("-p", outputDir);

        const mainClass = "org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler";

        const javaCommand = `java -classpath ${fernflower};${renamerClassPath} ${mainClass} -ren=1 -urc=${customRenamer} ${input} ${outputDir}`;
        cmd(sudoWorks ? "sudo " + javaCommand : javaCommand);


        if (attributes.archive) {
            const archive = path.join(outputDir, attributes.archive);
            const sevenZip = require("7zip")["7z"];
            cmd(`${sevenZip} e ${archive} -o${outputDir} *.java -y > NUL:`);
            fs.unlinkSync(archive);
        }
    });

    console.log("Decompiling done.");
}