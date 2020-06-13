#!/usr/bin/env node
const chalk = require("chalk");
const { depopulate, spawnDisparateShell } = require("../utils/fs.js");

/**
 * @description Command handler. Launch detached editor from which to update 
 *   depopulated local entry template.
 */
const touch = async () => {
    try {
        depopulate();
        console.log(chalk.green("[+] Launching editor...\n"));
        spawnDisparateShell();
    } catch(err) {
        console.log(chalk.red(err));
    }
}
exports.command = "touch"
exports.desc = "Create new entry"
exports.handler = () => {
    touch();
}
