import chalk = require("chalk");
import { exec, ExecOptions } from "shelljs";

export default function cmd(command: string, options?: ExecOptions): string {
    const printCommand = !options || !options.silent;
    if (printCommand) {
        console.log(chalk.blue(command));
    }
    const result: any = exec(command, options);
    if (result.code !== 0) {
        throw new Error(result.stderr);
    }
    return result.stdout.trim().replace("\r\n", "\n");
}