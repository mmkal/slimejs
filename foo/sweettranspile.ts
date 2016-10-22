import request = require("request-promise");
import fs = require("fs");
import path = require("path");

const appletShims = fs.readFileSync("foo/AppletShims.java", "utf8");

const classes = allMatches(appletShims, /public (class|interface) (\w+)/g).map(m => m[2]);

let slime = fs.readFileSync("soccer/WorldCupSoccerSlime.java", "utf8");

slime = slime.replace(/(do)([^{]+?)(while)/g, (match, g1, g2, g3) => `${g1} { ${g2} } ${g3}`);

slime = slime.replace(/import .*;/g, "");

slime = appletShims + "\r\n\r\n" + "public class Marker{}" + "\r\n" + slime;

classes.forEach(c => {
    const exactWord = new RegExp("\\b" + c + "\\b", "g");
    slime = slime.replace(exactWord, "Shimmed" + c);
});

(async function() {
    const javaCode = slime;
    const response = await request.post("http://sandbox.jsweet.org/transpile", { form: { javaCode: javaCode, tsout: true } });
    const transpilation = JSON.parse(response);
    if (transpilation.success) {
        fs.writeFileSync("foo/output.ts.txt", transpilation.tsout, "utf8");
    } else {
        fs.writeFileSync("foo/input.java", javaCode, "utf8");
    }
    console.dir(transpilation);
})();

function allMatches(input: string, regexp: RegExp) {
    const matches = new Array<RegExpExecArray>();
    let match: RegExpExecArray;
    while (match = regexp.exec(input)) {
        matches.push(match);
    }
    return matches;
}