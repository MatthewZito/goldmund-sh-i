const fs = require("fs");
const chalk = require("chalk");
const { localStore } = require("../config/config.js");

const persist = notes => {
    const data = JSON.stringify(notes);
    fs.writeFileSync(localStore, data);
}

const mountEphemeralDoc = () => {
    try {
        const buffer = fs.readFileSync(localStore);
        const data = buffer.toString();
        return JSON.parse(data);        
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during mounting. See: ${err}`));
    }
}

module.exports = {
    persist,
    mountEphemeralDoc
}