const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const { sanitizeBody } = require("../middleware/sanitize.js");
const UserController = require("../controllers/user-controller.js");
const router = new express.Router();

/**
 * @summary Endpoint, handles User login.
 */
router.post("/login", 
    sanitizeBody, 
    authenticate, 
    UserController.login
    );

/**
 * @summary Endpoint, handles User logout.
 */
router.post("/logout", 
    sanitizeBody, 
    UserController.logout
    );

module.exports = router