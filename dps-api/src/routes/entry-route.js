const express = require("express");
const multer  = require("multer");
const upload = multer();
const authorize = require("../middleware/authorize.js");
const EntryController = require("../controllers/entry-controller.js");
const router = new express.Router();


// pull all entries/index thereof
router.get("/", 
    EntryController.fetchIndex
    );


// view entry
router.get("/entry/:slug", 
    EntryController.fetchEntry
    );

// new entry
router.post("/entry/new", 
    authorize, 
    upload.none(), 
    EntryController.createEntry
    );

// update entry
router.patch("/entry/:id", 
    authorize, 
    upload.none(), 
    EntryController.updateEntry
    );

module.exports = router

