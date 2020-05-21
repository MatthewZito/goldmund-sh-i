const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const escapeRegex = require("../../../utils/regex-escape.js");


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


EntrySchema.statics.findByTag = async (tag) => {
    let data = {}
    let searchPattern = new RegExp(escapeRegex(tag), 'gi');
    this.find({ tags: { $in: [searchPattern] } }).then(() => {
        return Entry.processBatch();
    }).then((res) => {
       console.log(res)
    });
    return data
}
// mongoose 4.5 introduced custom query methods...my life just got so much easier. save and fix on linux machine.
// yes, I am using github to transport my repo - I'm too lazy to use scp lol
// to get ID of last doc, entrieslist[-1]
EntrySchema.statics.processBatch = async (lastProcessedID=undefined) => {
    const numReturnedDocs = 10
    // first page
    if (!lastProcessedID) {
        data.entries = await Entry.find({ deleted: false }).limit(numReturnedDocs).sort({ createdAt: "desc" });
        if (!data.entries) {
            throw new Error("[-] Unable to query database for entries.")
        }
    }
    else {
        data.entries = await Entry.find( { "_id": { $gt: lastProcessedID }, deleted: false }).limit(numReturnedDocs).sort({ createdAt: "desc" });
       
    }
    return data
}
//  data.lastProcessedID = entries[-1]._id

EntrySchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.content) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.content));
    }
    next();
})

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry