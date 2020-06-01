#!/usr/bin/env node
const chalk = require("chalk");
const { mountEphemeralDoc, readToken } = require("../utils/fs.js");
const { pushEntry } = require("../utils/requests.js");

/**
 * @description Command handler. Pushes the current entry template to server. If entry ID exists, the entry is of 
 * type update and is therefore sent to the PATCH endpoint. Else, the entry is new and is sent to the new entry endpoint.
 */
const processEntry = async () => {
    try {
        const ephemeralEntry = mountEphemeralDoc();
        const { token } = readToken();
        if (!token) {
            throw new Error("[-] You must first authenticate.\n");
        }
        // id present === update existing
        if (ephemeralEntry["_id"]) {
            let id = ephemeralEntry["_id"] // pull id
            delete ephemeralEntry["_id"] // rm id from req object
            let response = await pushEntry(id, ephemeralEntry, token);
            console.log(chalk.green(`[+] Entry ${id} successfully updated.\n`));
        }
        else {
            let response = await pushEntry(false, ephemeralEntry, token);
            console.log(chalk.green(`[+] New entry ${response} created.\n`));
        }
        
    } catch(err) {
        console.log(chalk.red(err));
    }
    
}

exports.command = "push"
exports.desc = "Push local tempfile to database"
exports.handler = () => {
    processEntry();
}
