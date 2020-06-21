const mongoose = require("mongoose");
const validator = require("validator");

/**
 * @class EmailSchema
 */
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
 * @param {func} callback
 * @description Ensures sanitization validators are called via corresponding middleware.
 */
EmailSchema.pre("save", function(next) {
    return next();
})

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email