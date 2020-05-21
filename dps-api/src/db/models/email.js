const mongoose = require("mongoose");
const validator = require('validator');

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    },
    { timestamps: true }
);

/**
 * Ensures validators are called via middleware arg.
 * @param {next} func callback
 */
EmailSchema.pre("save", function(next) {
    next();
})

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email