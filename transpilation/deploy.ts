import fs = require("fs");
import { exec } from "shelljs";

function cmd(command: string): string {
    const result: any = exec(command);
    return result.stdout.trim().replace("\r\n", "\n");
}

const currentBranch = cmd("git rev-parse --abbrev-ref HEAD");
if (currentBranch !== "master") {
    throw new Error("This script should only be run on master. You're on " + currentBranch);
}
const changes = cmd("git status --porcelain");
if (changes) {
    throw new Error("This script shouldn't be run when you've got working copy changes.");
}

cmd("git branch -f gh-pages");
cmd("git checkout gh-pages");

const toDeploy = [ "index.html", "dist/slime.js", ".gitignore", "transpilation/deploy.ts" ];

const gitignore = ["*"].concat(toDeploy.map(f => "!" + f)).join("\r\n");

fs.writeFileSync(".gitignore", gitignore, "utf8");

const trackedFiles = cmd("git ls-files").split("\n");
const toRemove = trackedFiles.filter(f => toDeploy.indexOf(f) === -1)

toRemove.forEach(f => cmd(`git rm -rf '${f}' --dry-run`));

// cmd("git rm -rf * --dry-run");

toDeploy.forEach(f => cmd(`git add ${f}`));

console.log(cmd("git status"));