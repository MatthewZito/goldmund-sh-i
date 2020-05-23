const Email = require("../db/models/email-model.js");

exports.processEmail = async (req, res) => {
    try {
        const email = new Email(req.body);
        await email.save();
        return res.status(201).end();
    } catch(err) {
        return res.status(400).end();
    }
}