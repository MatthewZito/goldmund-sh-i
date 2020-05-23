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


// // logout
// router.post("/user/logout", authenticate, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter(token => {
//             return token.token !== req.token
//         })
//         await req.user.save();
//         res.send()
//     } catch(err) {
//         res.status(500).send();
//     }
// });

// // logout all sessions
// router.post("/user/logoutall", authenticate, async (req, res) => {
//     try {
//         req.user.tokens = []
//         await req.user.save();
//         res.send()
//     } catch(err) {
//         res.status(500).send();
//     }
// });

module.exports = router