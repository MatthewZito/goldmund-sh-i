#!/usr/bin/env node
const chalk = require("chalk");
const { depopulate, streamInputFileToEphemeralDoc } = require("../utils/fs.js");
const { spawnDisparateShell } = require("../utils/shell.js");
const { entryTemplate } = require("../config/config.js");

/**
 * @description Command handler. Launch detached editor from which to update 
 *   depopulated entry template.
 */
const touch = async (options) => {
    try {
        depopulate();
        if (options) {
            streamInputFileToEphemeralDoc();
        }
        spawnDisparateShell(undefined, entryTemplate);
    } catch(err) {
        console.log(chalk.red(err));
    }
}
exports.command = "touch"
exports.desc = "Create new entry"
exports.builder = {
    stream: {
        describe: "Stream contents from markdown template",
        demandOption: false,
        type: "boolean"
    },
}
exports.handler = (argv) => {
    touch(argv.stream);
}