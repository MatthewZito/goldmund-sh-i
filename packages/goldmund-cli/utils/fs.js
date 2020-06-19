#!/usr/bin/env node
const { exec } = require("child_process");
const os = require("os");
const fs = require("fs");
const chalk = require("chalk");
const { editor, entryTemplate } = require("../config/config.js");

/**
 * @param {Object} inputObject Object of key-value pairs (token, or entry metadata) to be persisted in local session storage.
 * @param {String} templateFile Path for the template file to which the data is persisted.
 * @description Persists given input object into local storage.
 */
const persist = (inputObject, templateFile) => {
    const data = JSON.stringify(inputObject, null, 4);
    fs.writeFileSync(templateFile, data);
}

/**
 * @description Read data from given template file.
 * @returns Given template file's data object, if extant. Currently, this
 *     is either the session token or entry data. Else, throws error.
 */
const readTemplateData = (templateFile) => {
    try {
        const buffer = fs.readFileSync(templateFile);
        const data = buffer.toString();
        return JSON.parse(data);        
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during mounting. See: ${err}\n`));
    }
}

/**
 * @description Depopulate entry template and reset to defaults.
 */
const depopulate = () => {
    let ephemeralEntryTemplate = {}
    const fields = [ "deleted", "tags", "title", "subtitle", "imgsrc", "content"]
    fields.forEach(field => 
        field === "tags" ? ephemeralEntryTemplate[field] = [] : ephemeralEntryTemplate[field] = ""
        );
    persist(ephemeralEntryTemplate, entryTemplate);
}

/**
 * @param {String} executable Program with which to execute command(s). Defaults to text editor.
 * @param {String} processCommand Command to be executed in detached shell's child process.
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
 * @param {String} file File from which to read contents.
 * @description Stream contents of given file into template file content field.
 * Note: Temporarily configured to utilize hardcoded default. 
 */
const streamInputFileToEphemeralDoc = (file=`${__dirname}/../tmp/markdown_template.md`) => {
    try {
        console.log(chalk.green(`[+] Streaming contents of markdown template into template file...`));
        const entry = readTemplateData(entryTemplate);
        const buffer = fs.readFileSync(file, "utf8");
        entry.content = buffer
        persist(entry, entryTemplate);
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during streaming. See: ${err}\n`));
    }
}

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
    persist,
    readTemplateData,
    depopulate,
    spawnDisparateShell,
    streamInputFileToEphemeralDoc,
    executeChildProcess
}