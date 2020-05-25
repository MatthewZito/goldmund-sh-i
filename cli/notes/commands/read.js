const validator = require("validator");
const chalk = require("chalk");
const { loadNotes } = require("../utils.js");

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note) {
        console.log(note.body)
    }
    else {
        console.log(chalk.red(`[-] Note ${title} does not exist.`));
    }
}

exports.command = "read"
exports.desc = "Read an existing note"
exports.builder = {
    title: {
        describe: "Note title",
        demandOption: true,
        type: "string"
    }
}
exports.handler = argv => {
    readNote(argv.title);
}
