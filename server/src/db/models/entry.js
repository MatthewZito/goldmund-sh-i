const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window)

const entrySchema = new mongoose.Schema({
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
    entryIssued: {
        type: Date,
        default: Date.now
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

entrySchema.pre("validate", function(next) {
    console.log("validate")
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
        console.log(this.slug)
    }
    if (this.content) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.content));
    }
    next();
})

// entrySchema.pre("findOneAndUpdate", function(next) {
//     console.log("validate")
//     console.log(this)
//     if (this.title) {
//         console.log("SLUGZ")
//         this.slug = slugify(this.title, { lower: true, strict: true })
//         console.log(this.slug)
//     }
//     if (this.content) {
//         this.sanitizedHTML = dompurify.sanitize(marked(this.content));
//     }
//     next();
// })

module.exports = mongoose.model("Entry", entrySchema);