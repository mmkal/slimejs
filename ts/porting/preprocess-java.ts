import fs = require("fs");
import matches from "../util/regex";

export default function getTranspilableJava(java: string) {
    const appletShims = fs.readFileSync("java/Shims.java", "utf8");

    const shimmableClasses = matches(appletShims, /public (class|interface) (\w+)/g).map(m => m[2]);

    java = fixMissedRenames(java);

    java = java.replace(/(\bdo\b)([^{]+?)(while)/g, (match, g1, g2, g3) => `${g1} { ${g2} } ${g3}`);

    java = java.replace(/\bcase\b '(.)'/g, (m, ch: string) => `case ${ch.charCodeAt(0)}`);

    java = java.replace(/\w+\.sleep\b/g, "ShimmedThread.sleep"); // nasty. Java can call static methods from instances, but the transpiler doesn't like it.

    java = java.replace(/(new int\b ?)\[\w+\](?!(\[))/g, (m, g1) => `${g1}[0]`); // char/int auto-conversion in Java doesn't work in TS. But we also don't need to give int arrays an initial size.

    // java = java.replace(/((this\.)?\w+).toCharArray\(\)/g, (m, g1) => `ShimmedChars.charCodeArray(${g1})`);
    // java = java.replace(/\bchar\b([^\n]+ = ShimmedChars.charCodeArray)/g, (m, g1) => `int${g1}`);

    java = java.replace(/'\\u[0-9A-Za-z]{4}'/g, m => eval(m + ".charCodeAt(0)"));

    java = java.replace(/import .*;/g, "");

    java = java.replace(/package .*;/g, "");

    java = appletShims + "\r\n\r\n" + "public class EndOfShimDeclarations{}" + "\r\n" + java;

    shimmableClasses.forEach(c => {
        const exactWord = new RegExp("\\b" + c + "\\b", "g");
        java = java.replace(exactWord, "Shimmed" + c);
    });

    const tooLong = () => java.length > 100 * 1000;
    const compressSpaces = () => {
        const newLineMarker = Date.now() + "NEWLINE" + Date.now();
        java = java.replace(/\s*\n\s*/g, newLineMarker);
        java = java.replace(/\s+/g, " ");
        java = java.split(newLineMarker).join("\n");
    }

    if (tooLong()) {
        compressSpaces();
    }

    if (tooLong()) {
        java = java.replace(/\n\s*\/\/.*?\n/g, "\n\n");
        compressSpaces();
    }

    if (tooLong()) {
        throw new Error("Java code too long.");
    }

    return java;
}

/** fernflower decompiler doesn't seem to rename fields used in subclasses properly. This attempts to fix that. */
function fixMissedRenames(java: string) {
    const classes = matches(java, /\n[^\n]*\bclass (\w+) (extends (\w+) )?(implements (\w+) )?{/g).map((m, i, matchArray) => {
        const bodyStart = m.index;
        const bodyEnd = (i + 1 < matchArray.length) ? matchArray[i + 1].index : java.length;
        const body = java.substring(bodyStart, bodyEnd);

        const renamedMethods = matches(body, /method_rn_(\w+?)_(\w+?)_\d+\b/g).reduce((output, methodMatch) => {
            output[methodMatch[2]] = methodMatch[0];
            return output;
        }, {}  as { [originalName: string]: string });

        const renamedFields = matches(body, /field_rn_(\w+?)_(\w+?)_\d+\b/g).reduce((output, fieldMatch) => {
            output[fieldMatch[2]] = fieldMatch[0];
            return output;
        }, { } as { [originalName: string]: string });

        return { 
            name: m[1],
            parent: m[3] || null, 
            declaration: m[0],
            index: m.index,
            body: java.substring(bodyStart, bodyEnd), 
            renamedFields: renamedFields,
            renamedMethods: renamedMethods
        };
    });

    classes.forEach(c => {
        const parent = classes.find(p => p.name === c.parent);
        if (!parent) return;

        Object.keys(parent.renamedMethods).forEach(oldName => {
            const newName = parent.renamedMethods[oldName];
            c.body = c.body.replace(new RegExp(`\\bthis\\.${oldName}\\b(?=(\\())`, "g"), "this." + newName);
        });

        Object.keys(parent.renamedFields).forEach(oldName => {
            const newName = parent.renamedFields[oldName];
            c.body = c.body.replace(new RegExp(`\\bthis\\.${oldName}\\b(?!(\\())`, "g"), "this." + newName);
        });
    });

    java = classes.map(c => c.body).join("");

    return java;
}

