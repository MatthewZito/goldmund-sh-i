#!/usr/bin/env node
const chalk = require("chalk");
const { persist } = require("../utils/fs.js");
const { fetchEntry } = require("../utils/web.js");
const { spawnDisparateShell } = require("../utils/shell.js");
const { entryTemplate } = require("../config/config.js");

/**
 * @param {String} slug The slug (URI identifier) of the given entry.
 * @description Command handler. Populates entry template by pulling given entry and persisting matched fields.
 */
const populateEntry = async (slug) => {
    try {
        let ephemeralEntry = {}
        const entry = await fetchEntry(slug);
        if (!entry) {
            throw new Error("[-] Entry object not found; population terminated.\n")
        }
        else {
            const fields = [ "deleted", "tags", "_id", "title", "subtitle", "imgsrc", "content"]
            // filter res to legal fields
            let legalFields = Object.keys(entry).filter(field => fields.includes(field));
            legalFields.forEach(legalField => 
                ephemeralEntry[legalField] = entry[legalField]
                );
            // populate entry template
            persist(ephemeralEntry, entryTemplate);
            console.log(chalk.green("[+] Ephemeral document populated...\n"));
            spawnDisparateShell(undefined, entryTemplate);
        }
    } catch(err) {
        console.log(chalk.red(err));
    }
}

exports.command = "pull"
exports.desc = "Populate entry template"
exports.builder = {
    slug: {
        describe: "Specify entry URI",
        demandOption: true,
        type: "string"
    },
}
exports.handler = argv => {
    populateEntry(argv.slug);
}
