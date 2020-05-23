const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const escapeRegex = require("../../utils/regex-escape.js");


const EntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    imgsrc: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tags: {
        type: Array
    }
    },
    { timestamps: true }
);

/**
 * Find all entries whose tags contain a regex object created contingent on user input tag
 * @param {tag} string Given tag for regex against which to query.
 * @param {lastProcessedID} any createdAt Date ID object signifying cursor qua last processed batch.
 * Returns all matched entries (even if no res). Chains to `processBatch`.
 */
EntrySchema.query.findByTag = async function(tag, lastProcessedID) {
    let searchPattern = new RegExp(escapeRegex(tag), 'gi');
    return await this.find({ tags: { $in: [searchPattern] } }).processBatch(lastProcessedID);
}

/**
 * Batch process documents by numReturnedDocs per page, as delimited by `lastProcessedID`. 
 * @param {lastProcessedID} any createdAt Date ID object signifying cursor qua last processed batch.
 * Returns all matched entries (even if no res).
 */
EntrySchema.query.processBatch = async function(lastProcessedID=undefined) {
    const numReturnedDocs = 10
    // first page
    if (!lastProcessedID) {
        let entries = await this.find().sort({ createdAt: "desc"}).limit(numReturnedDocs);
        if (!entries) {
            // first batch; if nothing found, likely erroneous
            throw new Error("[-] Unable to query database for entries.")
        }
        return entries
    }
    else {
        return await this.find( { "createdAt": { $lt: lastProcessedID }}).sort({ createdAt: "desc"}).limit(numReturnedDocs);
    }
}

/**
 * Slugify title and sanitize markdown content, transmogrify into raw HTML
 * @param {next} func callback
 */
EntrySchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.content) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.content));
    }
    return next();
})

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry