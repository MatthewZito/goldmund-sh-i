const Entry = require("../db/models/entry-model.js");
const calculateLastProcessedID = require("../utils/last-id.js");

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @returns A server response status commensurate with operational status. 
 *     A batch of entries, calculated lastProcessedID upon success. Error message upon failure.
 * @summary Fetch Entries index batch.
 * @description Pulls query objects and incorporates into db query where applicable. Fetches full db index 
 *     in batch specified by `lastProcessedID`. Calculates new `lastProcessedID`.
 */
exports.fetchIndex = async (req, res) => {
    const { search, lastProcessedID } = req.query
    try {
        // query param provided, return corresponding filtered index
        if (search) {
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
        return res.status(500).send({ error: "[-] A critical error has occurred. This transaction has been logged."});
    }
}

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @returns A server response status commensurate with operational status. 
 *     The found Entry object upon success, else error message.
 * @summary Fetch Entry by id.
 * @description Queries database for an entry via its slug. 
 */
exports.fetchEntry = async (req, res) => {
    try {
        const entry = await Entry.findOne({ slug: req.params.slug, deleted: false })
        if (entry === null) {
            return res.status(500).send({ error: "[-] Entry not found."});
        }
        return res.send(entry);
    } catch(err) {
        return res.status(500).send({ error: "[-] A critical error has occurred. This transaction has been logged."});
    }
}

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @returns A server response status commensurate with operational status. 
 *     The slug identifier for the newly-created Entry. Else, an error message.
 * @summary Create new Entry.
 * @description Pulls new Entry data and author from req object. Persists Entry.
 */
exports.createEntry = async (req, res) => {
    const entry = new Entry({
        ...req.body,
        author: req.author
    });
    try {
        await entry.save();
        return res.status(201).send(entry.slug);
    } catch(err) {
        return res.status(400).send({ error: "[-] A critical error has occurred. This transaction has been logged."});
    }
}

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @returns A server response status commensurate with operational status. 
 *     The slug identifier for the newly-created Entry. Else, an error message.
 * @summary Update existing entry by id and author.
 * @description Pulls existing Entry id and author from req object. 
 *     Maps all user-provided fields (taken from req obj) into data object, which is persisted atop existing Entry ID. 
 *     Non-mapped fields are therefore idempotent and will remain unchanged.
 */
exports.updateEntry = async (req, res) => {
    try { 
        let entry = await Entry.findOne({ _id: req.params.id, author: req.author });
        if (!entry) {
            return res.status(401).send({ error: "[-] Authentication required. This transaction has been logged."});
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
        return res.status(500).send({ error: "[-] A critical error has occurred. This transaction has been logged."});
    }
}