const Entry = require("../db/models/entry-model.js");
const calculateLastProcessedID = require("../utils/last-id.js");

exports.fetchIndex = async (req, res) => {
    const { search, lastProcessedID } = req.query
    try {
        // query param provided, return corresponding filtered index
        if (search !== undefined && search !== ""){
            let entries = await Entry.find({ deleted: false }).findByTag(search, lastProcessedID);
            let newLastProcessedID = calculateLastProcessedID(entries);
            return res.send({ entries, newLastProcessedID });
        }
        // no query param provided, continue with batch processing
        else {
            let entries = await Entry.find({ deleted: false }).processBatch(lastProcessedID);
            let newLastProcessedID = calculateLastProcessedID(entries);
            return res.send({ entries, lastProcessedID: newLastProcessedID});
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

exports.fetchEntry = async (req, res) => {
    try {
        const entry = await Entry.findOne({ slug: req.params.slug, deleted: false })
        if (entry === null) {
            return res.status(500).end(); 
        }
        return res.send(entry);
    } catch(err) {
        return res.status(500).send(err);
    }
}

exports.createEntry = async (req, res) => {
    const entry = new Entry({
        ...req.body,
        author: req.author
    });
    try {
        await entry.save();
        return res.status(201).send(entry.slug);
    } catch(err) {
        return res.status(400).send(err);
    }
}

exports.updateEntry = async (req, res) => {
    try { 
        let entry = await Entry.findOne({ _id: req.params.id, author: req.author });
        if (!entry) {
            return res.status(401).send({ error: "Authentication required. This transaction has been logged."});
        }
        // map all user-provided fields into data object
        Object.keys(req.body).forEach(key => {
            entry[key] = req.body[key]
        });

        entry = await entry.save();

        if (entry.deleted) {
            return res.status(204).end()
        }
        return res.status(201).send(entry.slug);
    } catch(err) {
        return res.status(500).send(err);
    }
}
// TODO end exception responses with custom error msg