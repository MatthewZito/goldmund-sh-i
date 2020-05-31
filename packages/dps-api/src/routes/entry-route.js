const express = require("express");
const multer  = require("multer");
const upload = multer();
const authorize = require("../middleware/authorize.js");
const { sanitizeQuery } = require("../middleware/sanitize.js");
const EntryController = require("../controllers/entry-controller.js");
const router = new express.Router();

/**
 * @summary Endpoint, handles fetching Entry index.
 */
router.get("/", 
    sanitizeQuery,
    EntryController.fetchIndex
    );

/**
 * @summary Endpoint, handles fetching Entry by slug.
 */
router.get("/:slug",
    EntryController.fetchEntry
    );

/**
 * @summary Endpoint, handles creation of new Entry.
 */
router.post("/new", 
    authorize, 
    upload.none(), 
    EntryController.createEntry
    );

/**
 * @summary Endpoint, handles updating of existing Entry by id.
 */
router.patch("/:id", 
    authorize, 
    upload.none(), 
    EntryController.updateEntry
    );

module.exports = router

