import fs = require("fs");
import { exec } from "shelljs";

exec("git branch -f gh-pages");
exec("git checkout gh-pages");

const toDeploy = [ "index.html", "dist/slime.js", ".gitignore", "transpile/deploy.ts", "dist/transpile/deploy.js" ];

const gitignore = ["*"].concat(toDeploy.map(f => "!" + f)).join("\r\n");

fs.writeFileSync(".gitignore", gitignore, "utf8");

exec("git rm -rf");

toDeploy.forEach(f => exec(`git add ${f}`));