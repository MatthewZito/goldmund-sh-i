#!/usr/bin/env node
const os = require("os");
const chalk = require("chalk");
const { spawnDisparateShell, executeChildProcess } = require("../utils/fs.js");
const { cloudinaryDir } = require("../config/config.js");

/**
 * @description Command handler. Launch detached shell from which to launch
 *     Express server for watching changes in the Local Cloudinary Directory.
 *     A Chokidar worker is initialized and watches for add events, which in turn trigger
 *     Cloudinary CDN resource creation. The Express server is launched as a disparate process in a detached shell;
 *     the local Cloudinary directory (that which is monitored by the worker) is also launched via desktop manager.
 */
const cdn = async () => {
    try {
        if (os.platform() === "darwin") {
            let processCommand = `open ${cloudinaryDir}`
            executeChildProcess(processCommand);
        }
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