const validator = require("validator");
const chalk = require("chalk");
const { mountEphemeralDoc, persist } = require("../utils/data.js");

const populateEntry = (id) => {
    const ephemeralEntry = mountEphemeralDoc();
    console.log(ephemeralEntry)
    // persist(ephemeralEntry);
    // console.log(chalk.green("[+] Ephemeral document populated..."));
}

exports.command = "get"
exports.desc = "populate local temp doc"
exports.builder = {
    id: {
        describe: "entry identification number",
        demandOption: true,
        type: "string"
    }
}
exports.handler = argv => {
    populateEntry(argv.id);
}
