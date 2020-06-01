const express = require("express");
const { sanitizeBody } = require("../middleware/sanitize.js");
const EmailController = require("../controllers/email-controller.js");
const router = new express.Router();

/**
 * @summary Endpoint, handles received emails.
 */
router.post("/", 
    sanitizeBody, 
    EmailController.processEmail
    );

module.exports = router