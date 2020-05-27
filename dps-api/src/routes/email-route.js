const express = require("express");
const { sanitizeBody } = require("../middleware/sanitize.js");
const EmailController = require("../controllers/email-controller.js");
const router = new express.Router();

// process emails
router.post("/email", 
    sanitizeBody, 
    EmailController.processEmail
    );

module.exports = router