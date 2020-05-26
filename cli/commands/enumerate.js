const chalk = require("chalk");
const { loadNotes } = require("../utils.js");

const enumerateNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.yellow(note.title))
    });
}

exports.command = "list"
exports.desc = "List all existing notes"
exports.handler = () => {
    enumerateNotes();
}
