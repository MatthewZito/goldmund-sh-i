#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const { entryTemplate } = require("../config/config.js");

/**
 * @param {Object} inputObject Object of key-value pairs (token, or entry metadata) to be persisted in local session storage.
 * @param {String} templateFile Path for the template file to which the data is persisted.
 * @description Persists given input object into local storage.
 */
const persist = (inputObject, templateFile) => {
    const data = JSON.stringify(inputObject, null, 4);
    fs.writeFileSync(templateFile, data);
}

/**
 * @description Read data from given template file.
 * @returns Given template file's data object, if extant. Currently, this
 *     is either the session token or entry data. Else, throws error.
 */
const readTemplateData = (templateFile) => {
    try {
        const buffer = fs.readFileSync(templateFile);
        const data = buffer.toString();
        return JSON.parse(data);        
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during mounting. See: ${err}\n`));
    }
}

/**
 * @description Depopulate entry template and reset to defaults.
 */
const depopulate = () => {
    let ephemeralEntryTemplate = {}
    const fields = [ "deleted", "tags", "title", "subtitle", "imgsrc", "content"]
    fields.forEach(field => 
        field === "tags" ? ephemeralEntryTemplate[field] = [] : ephemeralEntryTemplate[field] = ""
        );
    persist(ephemeralEntryTemplate, entryTemplate);
}

/**
 * @param {String} file File from which to read contents.
 * @description Stream contents of given file into template file content field.
 * Note: Temporarily configured to utilize hardcoded default. 
 */
const streamInputFileToEphemeralDoc = (file=`${__dirname}/../tmp/markdown_template.md`) => {
    try {
        console.log(chalk.green(`[+] Streaming contents of markdown template into template file...`));
        const entry = readTemplateData(entryTemplate);
        const buffer = fs.readFileSync(file, "utf8");
        entry.content = buffer
        persist(entry, entryTemplate);
    }
    catch (err) {
        console.log(chalk.red(`[-] A critical error occurred during streaming. See: ${err}\n`));
    }
}


module.exports = {
    persist,
    readTemplateData,
    depopulate,
    streamInputFileToEphemeralDoc
}