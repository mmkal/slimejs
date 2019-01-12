import fs = require("fs");
import path = require("path");
import url = require("url");
import request = require("request-promise");
import cheerio = require("cheerio");
import shell = require("shelljs");
import cmd, { defineBuildScript } from "../util/cmd";
import paths from "./paths"

defineBuildScript(module, fetchGames);

async function fetchGames() {
    const host = "http://slimegames.eu/";
    const gameListHtml = await request(host); 
    const dom = cheerio.load(gameListHtml);

    const gameLinks = new Set<string>();
    dom("table.Slime a").each((i, el) => {
        gameLinks.add(host + el.attribs["href"]);
    });
    gameLinks.add("http://oneslime.net/");
    // gameLinks.add("http://slimetennis.com/"); // seems to be dead. I think I have it cached on the `downloaded` branch. Should probably use that.
    gameLinks.add("http://footyslime.com/afl/");
    gameLinks.add("http://footyslime.com/nrl/");

    const games = Array.from(gameLinks)
        .filter(game => game.indexOf("volleyball-one") === -1); // slimegames.eu/volleyball-one has some files missing on the site. It's the same as oneslime.net though.
    for (let i = 0; i < games.length; i++) {
        await downloadGame(games[i]);
    }
}

async function downloadGame(link: string) {
    process.stdout.write(`Downloading game at ${link}... `);
    const gameHtml = await request(link);
    const gameDom = cheerio.load(gameHtml);

    const applet = gameDom("applet");
    const code = applet.attr("code");

    const gameUrl = url.parse(link);

    const parts = link.split("/");
    parts.pop();

    const relativeCodePath = url.resolve(applet.attr("codebase") || "", applet.attr("archive") || applet.attr("code"));
    const siteCodePath = url.resolve(gameUrl.path, relativeCodePath);
    const resource = url.resolve(link, siteCodePath);

    const relPath = resource.substring(resource.indexOf(gameUrl.hostname));
    const relDir = path.dirname(relPath).replace(".com", "").replace(".net", "").replace(".eu", "").replace(/[\.\/]/g, "-");
    const fileName = path.basename(relPath);
    const outputPath = path.join(paths.compiledDir, relDir, fileName);

    const attributesPath = path.join(path.dirname(outputPath), paths.attributesFile);

    if (fs.existsSync(outputPath)) return console.log(`${resource} already exists at ${outputPath}`);

    shell.mkdir("-p", path.dirname(outputPath));
    try {
        await new Promise((resolve, reject) => {
            request(resource)
                .pipe(fs.createWriteStream(outputPath))
                .on("finish", resolve)
                .on("error", reject);
        });
        fs.writeFileSync(attributesPath, JSON.stringify(applet[0].attribs), "utf8");
        console.log(`Downloaded ${resource} to ${outputPath}`);
    }
    catch (e) {
        console.error(`Downloading ${resource} failed: ${e}`);
    }
    request(resource).pipe(fs.createWriteStream(outputPath));
    await new Promise(r => setTimeout(r, 1000));
}