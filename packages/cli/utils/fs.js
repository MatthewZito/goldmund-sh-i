#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const { localStore, sessionStore } = require("../config/config.js");

/**
 * @param {Object} inputObject Object of key-value pairs (token) to be persisted in local session storage.
 * @description Persists given input object into local session storage.
 * Will be extended and must be discrete from persist.
 */
const authorize = inputObject => {
    const data = JSON.stringify(inputObject, null, 4);
    fs.writeFileSync(sessionStore, data);
}

/**
 * @param {Object} inputObject Object of key-value pairs (entry) to be persisted in local template storage.
 * @description Persists given input object into local template storage.
 * Will be extended and must be discrete from authorize.
 */
const persist = inputObject => {
    const data = JSON.stringify(inputObject, null, 4);
    fs.writeFileSync(localStore, data);
}

/**
 * @description Read token from local session storage.
 * @returns Token, if extant. Else, throws error.
 * Will be extended and must be discrete from mountEphemeralDoc.
 */
const readToken = () => {
    try {
        const buffer = fs.readFileSync(sessionStore);
        const data = buffer.toString();
        return JSON.parse(data);        
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during mounting. See: ${err}\n`));
    }
}

/**
 * @description Mount entry from local template storage.
 * @returns Template data, if extant. Else, throws error.
 * Will be extended and must be discrete from readToken.
 */
const mountEphemeralDoc = () => {
    try {
        const buffer = fs.readFileSync(localStore);
        const data = buffer.toString();
        return JSON.parse(data);        
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during mounting. See: ${err}\n`));
    }
}

module.exports = {
    authorize,
    persist,
    readToken,
    mountEphemeralDoc
}