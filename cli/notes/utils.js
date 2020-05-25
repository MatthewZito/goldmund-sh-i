const fs = require("fs");
const { localStore } = require("./config.js");

const persist = notes => {
    const data = JSON.stringify(notes);
    fs.writeFileSync(localStore, data);
}

const loadNotes = () => {
    try {
        const buffer = fs.readFileSync(localStore);
        const data = buffer.toString();
        return JSON.parse(data)        
    }
    catch (err) {
        return []
    }
}

module.exports = {
    persist: persist,
    loadNotes: loadNotes
}