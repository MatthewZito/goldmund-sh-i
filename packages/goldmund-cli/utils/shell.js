#!/usr/bin/env node
const { exec } = require("child_process");
const os = require("os");
const chalk = require("chalk");
const { editor } = require("../config/config.js");

/**
 * @param {String} executable Program with which to execute command(s). Defaults to text editor.
 * @param {String} rawCommand Command to be executed in detached shell's child process.
 * @
 * @description Spawn a new shell instance and execute given command.
 *     Currently supports: osx, linux; this operation is blocking.
 *     Command defaults to launch entry template in given editor.
 * Note: other env incl Apple_Terminal
 */
const spawnDisparateShell = (executable=editor, rawCommand) => {
    const processCommand = `${executable} ${rawCommand}`
    const platform = os.platform()
    // vscode's shell environment does not support this feature; prevent launch here
    if (process.env.TERM_PROGRAM === "vscode") {
        return console.log(chalk.red("[-] Your current environment does not support this feature.\n"));
    }
    if (platform === "darwin" || platform.includes("linux")) {
        let command = null
        console.log(chalk.green(`[+] Initializing ${executable}...\n`));
        // macos-contingent spawn
        if (platform === "darwin") {
            command = [
                `osascript -e 'tell application "Terminal" to activate'`, 
                `-e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`, 
                `-e 'tell application "Terminal" to do script "${processCommand}" in selected tab of the front window'`
            ].join(" ");
        }
        // linux-contingent spawn (note: configured for Ubuntu distros)
        if (platform.includes("linux")) {
            command = `gnome-terminal -e 2>/dev/null 'bash -c \"${processCommand}; exec bash\"'`
        }
        executeChildProcess(command);
    }
    // unsupported OS
    else {
        return console.log(chalk.red("[-] Your operating system does not support this feature.\n"));
    }
}

/**
 * @param {String} Command Full command to execute as child process.
 * @description Accepts as input a full command which is executed as a child process accompanied by an exit event listener.
 */
const executeChildProcess = (command) => {
    const childProcess = exec(command, (err, stdout, stderr) => {
        if (err) {
            return console.log(`[-] Unable to spawn new process; see: ${err}\n`)
        }
        childProcess.on("exit", (code) => {
            if (code !== 0) {
                return console.log(chalk.red(`[-] Process exited with status ${code}.\n`))
            }
            return console.log(chalk.green("[+] Exited child process with condition: successful.\n"));
        });
    });
}

module.exports = {
    spawnDisparateShell,
    executeChildProcess
}