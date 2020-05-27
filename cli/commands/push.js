const chalk = require("chalk");
const { mountEphemeralDoc, readToken } = require("../utils/fs.js");
const { pushEntry } = require("../utils/requests.js");

const processEntry = async () => {
    try {
        const ephemeralEntry = mountEphemeralDoc();
        const { token } = readToken();
        if (!token) {
            throw new Error("\n[-] You must first authenticate.");
        }
        // id present === update existing
        if (ephemeralEntry["_id"]) {
            let id = ephemeralEntry["_id"] // pull id
            delete ephemeralEntry["_id"] // rm id from req object
            let response = await pushEntry(id, ephemeralEntry, token);
            console.log(chalk.green(`\n[+] Entry ${id} successfully updated.`));
        }
        else {
            let response = await pushEntry(false, ephemeralEntry, token);
            console.log(chalk.green(`\n[+] New entry ${response} created.`));
        }
        
    } catch(err) {
        console.log(chalk.red(err));
    }
    
}

exports.command = "push"
exports.desc = "push local tempfile to database"

exports.handler = () => {
    processEntry();
}
