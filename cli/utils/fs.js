#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const { localStore, sessionStore } = require("../config/config.js");

const authorize = inputObject => {
    const data = JSON.stringify(inputObject, null, 4);
    fs.writeFileSync(sessionStore, data);
}

const persist = inputObject => {
    const data = JSON.stringify(inputObject, null, 4);
    fs.writeFileSync(localStore, data);
}

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