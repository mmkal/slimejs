"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const request = require("request-promise");
const fs = require("fs");
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
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const javaCode = slime;
        const response = yield request.post("http://sandbox.jsweet.org/transpile", { form: { javaCode: javaCode, tsout: true } });
        const transpilation = JSON.parse(response);
        if (transpilation.success) {
            fs.writeFileSync("foo/output.ts.txt", transpilation.tsout, "utf8");
        }
        else {
            fs.writeFileSync("foo/input.java", javaCode, "utf8");
        }
        console.dir(transpilation);
    });
})();
function allMatches(input, regexp) {
    const matches = new Array();
    let match;
    while (match = regexp.exec(input)) {
        matches.push(match);
    }
    return matches;
}
//# sourceMappingURL=sweettranspile.js.map