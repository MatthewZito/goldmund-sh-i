#!/usr/bin/env node
const chalk = require("chalk");
const { depopulate, spawnDisparateShell, streamInputFileToEphemeralDoc } = require("../utils/fs.js");

/**
 * @description Command handler. Launch detached editor from which to update 
 *   depopulated local entry template.
 */
const touch = async (file) => {
    try {
        depopulate();
        if (file) {
            streamInputFileToEphemeralDoc();
        }
        spawnDisparateShell();
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
    touch(argv.file);
}