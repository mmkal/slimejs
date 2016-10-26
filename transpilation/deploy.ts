import fs = require("fs");
import { exec } from "shelljs";

function cmd(command: string) {
    const result: any = exec(command);
    return result.stdout;
}

const porcelain = cmd("git status --porcelain");
if (porcelain.trim()) {
    throw new Error("This script shouldn't be run when you've got working copy changes.");
}

cmd("git branch -f gh-pages");
cmd("git checkout gh-pages");

const toDeploy = [ "index.html", "dist/slime.js", ".gitignore", "transpile/deploy.ts", "dist/transpile/deploy.js" ];

const gitignore = ["*"].concat(toDeploy.map(f => "!" + f)).join("\r\n");

fs.writeFileSync(".gitignore", gitignore, "utf8");

cmd("git rm -rf * --dry-run");

toDeploy.forEach(f => cmd(`git add cmd{f}`));