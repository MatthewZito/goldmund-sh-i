#!/usr/bin/env node
const chalk = require("chalk");
const { depopulate } = require("../utils/fs.js");

/**
 * @description Command handler. Resets entry template to defaults.
 */
const flush = async () => {
    try {
        depopulate();
        console.log(chalk.green("[+] Successfully cleared entry template.\n"));
    } catch(err) {
        console.log(chalk.red(err));
    }
}
exports.command = "flush"
exports.desc = "Reset entry template"
exports.handler = () => {
    flush();
}
