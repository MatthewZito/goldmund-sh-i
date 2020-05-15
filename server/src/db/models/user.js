const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'");
            }
        }
    }
    },
    { timestamps: true }
);

// fetches user by email, then by matching plaintext to hashed pw
userSchema.statics.findByCredentials = async (email, password) => {
    // attempt to match email first; isnt hashed, ergo more expedient
    console.log("here")
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error("Unable to login.");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login.");
    }
    return user
}

// hash plaintext pw prior to persisting
userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 9);
    }
 
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User