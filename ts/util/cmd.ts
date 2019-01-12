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

export const defineBuildScript = async (expectedMainModule: typeof module, script: () => Promise<any>) => {
    if (require.main !== expectedMainModule) {
        return;
    }
    try {
        const result = await script();
        if (result) {
            console.log(result);
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}