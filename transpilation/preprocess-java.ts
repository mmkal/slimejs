import fs = require("fs");
import matches from "./regex";

export default function getTranspilableJava(java: string) {
    const appletShims = fs.readFileSync("transpilation/AppletShims.java", "utf8");

    const shimmableClasses = matches(appletShims, /public (class|interface) (\w+)/g).map(m => m[2]);

    java = java.replace(/(\bdo\b)([^{]+?)(while)/g, (match, g1, g2, g3) => `${g1} { ${g2} } ${g3}`);

    java = java.replace(/\bcase\b '(.)'/g, (m, ch: string) => `case ${ch.charCodeAt(0)}`);

    java = java.replace(/\w+\.sleep\b/g, "ShimmedThread.sleep"); // nasty. Java can call static methods from instances, but the transpiler doesn't like it.

    java = java.replace(/(new int\b ?)\[\w+\](?!(\[))/g, (m, g1) => `${g1}[0]`); // char/int auto-conversion in Java doesn't work in TS. But we also don't need to give int arrays an initial size.

    java = java.replace(/(\w+).toCharArray\(\)/g, (m, g1) => `ShimmedChars.charCodeArray(${g1})`);
    java = java.replace(/\bchar\b([^\n]+ = ShimmedChars.charCodeArray)/g, (m, g1) => `int${g1}`);

    java = java.replace(/import .*;/g, "");

    java = java.replace(/package .*;/g, "");

    java = appletShims + "\r\n\r\n" + "public class EndOfShimDeclarations{}" + "\r\n" + java;

    shimmableClasses.forEach(c => {
        const exactWord = new RegExp("\\b" + c + "\\b", "g");
        java = java.replace(exactWord, "Shimmed" + c);
    });

    if (java.length > 100 * 1000) {
        const newLineMarker = Date.now() + "NEWLINE" + Date.now();
        java = java.replace(/\s*\n\s*/g, newLineMarker);
        java = java.replace(/\s+/g, " ");
        java = java.split(newLineMarker).join("\n");
    }

    if (java.length > 100 * 1000) {
        throw new Error("Java code too long");
    }

    return java;
}