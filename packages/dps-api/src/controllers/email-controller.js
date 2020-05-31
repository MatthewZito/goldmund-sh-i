const Email = require("../db/models/email-model.js");

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @summary Handle received emails.
 * @description Pulls sanitized email body, instantiates new model-contingent Email object, persists to database.
 * @returns A server response status commensurate with the operations taken.
 */
exports.processEmail = async (req, res) => {
    try {
        const email = new Email(req.body);
        await email.save();
        return res.status(201).end();
    } catch(err) {
        return res.status(400).end();
    }
}