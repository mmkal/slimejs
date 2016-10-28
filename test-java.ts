import { exec, ExecOptions, mkdir } from "shelljs";

function cmd(command: string, options?: ExecOptions): string {
    const result: any = exec(command, options);
    if (result.code !== 0) {
        throw new Error(result.stderr);
    }
    return result.stdout.trim().replace("\r\n", "\n");
}
mkdir("dist");
const result = cmd(`javac Hello.java -d dist`);
console.log(result);

console.log(cmd(`/usr/lib/jvm/java-8-oracle/bin java -version`));