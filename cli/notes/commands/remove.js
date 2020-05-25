const validator = require("validator");
const chalk = require("chalk");
const { loadNotes, persist } = require("../utils.js");

const removeNote = title => {
    const notes = loadNotes();
    // len thereof should be shorter than notes if user-provided exists
    const existingNotes = notes.filter(note => note.title !== title);
    
    // validate given note is extant
    if (notes.length !== existingNotes.length) {
        persist(existingNotes);
        console.log(chalk.green(`[+] Note ${title} removed.`));
    }
    else {
        console.log(chalk.red(`[-] Note ${title} does not exist.`));
    }
}

exports.command = "remove"
exports.desc = "Remove an existing note"
exports.builder = {
    title: {
        describe: "Note title",
        demandOption: true,
        type: "string"
    }
}
exports.handler = argv => {
    removeNote(argv.title);
}
