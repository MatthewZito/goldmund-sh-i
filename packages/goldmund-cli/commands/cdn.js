#!/usr/bin/env node
const chalk = require("chalk");
const { spawnDisparateShell } = require("../utils/fs.js");

/**
 * @description Command handler. Launch detached shell from which to launch
 *     Express server for watching changes in the Local Cloudinary Directory.
 *     A worker is initialized and watches for addfile events, which in turn trigger
 *     Cloudinary CDN resource creation.
 */
const cdn = async () => {
    try {
        spawnDisparateShell("node",`${__dirname}/../services/cdn-service.js` );
    } catch(err) {
        console.log(chalk.red(err));
    }
}

exports.command = "cdn"
exports.desc = "Initialize CDN service"
exports.handler = () => {
    cdn();
}