const validator = require("validator");
const chalk = require("chalk");
const { loadNotes, persist } = require("../utils.js");

const writeNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = title => notes.find(note => note.title === title);

    while (duplicate(title)) {
        title += "x";
    }
    notes.push({
        title: title,
        body: body
    })
    persist(notes);
    console.log(chalk.green("[+] New note added."));
}

exports.command = "add"
exports.desc = "Add a new note"
exports.builder = {
    title: {
        describe: "Note title",
        demandOption: true,
        type: "string"
    },
    body: {
        describe: "Note body",
        demandOption: true,
        type: "string"
    }
}
exports.handler = argv => {
    writeNote(argv.title, argv.body);
}
