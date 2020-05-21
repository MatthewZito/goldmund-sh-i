const express = require("express");
const Email = require("../db/models/Email.js");
const sanitizeQuery = require("../../middleware/sanitize.js");
const router = new express.Router();

// login
router.post("/email", sanitizeQuery, async (req, res) => {
    try {
        const email = new Email(req.body);
        await email.save();
        res.status(201).send({ email });
    } catch(err) {
        res.status(400).send();
    }
});

module.exports = router