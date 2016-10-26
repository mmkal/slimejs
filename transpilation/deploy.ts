import fs = require("fs");
import { exec } from "shelljs";

function cmd(command: string): string {
    const result: any = exec(command);
    if (result.code !== 0) {
        throw new Error(result.stderr);
    }
    return result.stdout.trim().replace("\r\n", "\n");
}

const initialBranch = cmd("git rev-parse --abbrev-ref HEAD");
if (initialBranch !== "master") {
    throw new Error("This script should only be run on master. You're on " + initialBranch);
}
const changes = cmd("git status --porcelain");
if (changes) {
    throw new Error("This script shouldn't be run when you've got working copy changes.");
}

const lastCommit = cmd("git rev-parse HEAD");

cmd("git branch -f gh-pages");
cmd("git checkout gh-pages");

const toDeploy = [ "index.html", "dist/slime.js", ".gitignore" ];

fs.writeFileSync(".gitignore", "*", "utf8");

const trackedFiles = cmd("git ls-files").split("\n");
const toRemove = trackedFiles.filter(f => toDeploy.indexOf(f) === -1)

toRemove.forEach(f => cmd(`git rm -rf ${f}`));

toDeploy.forEach(f => cmd(`git add -f ${f}`));

cmd(`git commit -m "Auto-deploy of commit ${lastCommit} on branch ${initialBranch}.`);

console.log("Exiting.");
process.exit();