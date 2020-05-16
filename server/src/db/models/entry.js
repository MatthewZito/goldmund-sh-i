const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window)

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
    } 
    },
    { timestamps: true }
);

EntrySchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.content) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.content));
    }
    next();
})

module.exports = mongoose.model("Entry", EntrySchema);