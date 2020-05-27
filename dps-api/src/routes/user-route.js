const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const sanitizeQuery = require("../middleware/sanitize.js");
const UserController = require("../controllers/user-controller.js");
const router = new express.Router();

// login
router.post("/user/login", 
    sanitizeQuery, 
    authenticate, 
    UserController.login
    );

// logout
router.post("/user/logout", 
    sanitizeQuery, 
    UserController.logout
    );

module.exports = router