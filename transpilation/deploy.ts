import fs = require("fs");
import { exec, ExecOptions } from "shelljs";

function cmd(command: string, options?: ExecOptions): string {
    const result: any = exec(command, options);
    if (result.code !== 0) {
        throw new Error(result.stderr);
    }
    return result.stdout.trim().replace("\r\n", "\n");
}

const initialBranch = cmd("git rev-parse --abbrev-ref HEAD", { silent: true });
if (initialBranch !== "master") {
    throw new Error("This script should only be run on master. You're on " + initialBranch);
}
const changes = cmd("git status --porcelain", { silent: true });
if (changes) {
    throw new Error("This script shouldn't be run when you've got working copy changes. Your changes: " + changes);
}
const toDeploy = [ "index.html", "dist/slime.js", ".gitignore" ];

toDeploy.forEach(f => {
    if (!fs.existsSync(f)) throw new Error(`File ${f} is missing.`)
});

const lastCommit = cmd("git rev-parse HEAD", { silent: true });

const newBranch = "gh-pages";
cmd("git branch -f " + newBranch);
cmd("git checkout " + newBranch);


fs.writeFileSync(".gitignore", "*", "utf8");

const trackedFiles = cmd("git ls-files", { silent: true }).split("\n");
const toRemove = trackedFiles.filter(f => toDeploy.indexOf(f) === -1)

toRemove.forEach(f => cmd(`git rm -rf ${f}`));

toDeploy.forEach(f => cmd(`git add -f ${f}`));

cmd(`git commit -m "Auto-deploy of commit ${lastCommit} on branch ${initialBranch}.`);

cmd(`git push origin ${newBranch} -f`);

console.log("Exiting.");
process.exit();