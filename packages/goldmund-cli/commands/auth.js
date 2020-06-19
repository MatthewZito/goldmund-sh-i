#!/usr/bin/env node
const chalk = require("chalk");
const { persist } = require("../utils/fs.js");
const { login } = require("../utils/requests.js");
const { sessionTemplate } = require("../config/config.js");

/**
 * @description Command handler. Automate login process and persist resulting session token locally.
 */
const establishAuth = async () => {
    try {
        let token = await login();
        if (!token) {
            return
        }
        if (token && !token.success === "true") {
            throw new Error("[-] An error occurred during token generation.\n");
        }
        else {
            persist({ token: token.token }, sessionTemplate);
            console.log(chalk.green("[+] Successfully authenticated; new session established.\n"));
        }
    } catch(err) {
        console.log(chalk.red(err));
    }
}

exports.command = "auth"
exports.desc = "Authorize a session"
exports.handler = () => {
    establishAuth();
}
