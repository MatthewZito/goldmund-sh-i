const express = require("express");
const sanitizeQuery = require("../middleware/sanitize.js");
const EmailController = require("../controllers/email-controller.js");
const router = new express.Router();

// process emails
router.post("/email", 
    sanitizeQuery, 
    EmailController.processEmail
    );

module.exports = router