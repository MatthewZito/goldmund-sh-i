const express = require("express");
const multer  = require("multer");
const upload = multer();
const router = new express.Router();
const cors = require("cors");
const Entry = require("../db/models/entry.js");

router.use(cors());
// pull all entries/index thereof
router.get("/", async (req, res) => {
    res.set({ 'Content-Security-Policy': "script-src 'self'" })
    try {
        let entries = await Entry.find({ deleted: false }).sort({ createdAt: "desc" })
        res.send(entries);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// view entry
router.get("/entry/:slug", async (req, res) => {
    try {
        let entry = await Entry.findOne({ slug: req.params.slug, deleted: false })
        if (entry === null) {
            return res.status(500).end(); 
        }
        res.send(entry);
    } catch(err) {
        res.status(500).send(err);
    }
});

// TODO add handling for deleted set to true (cannot prompt redirect)
router.patch("/entry/:id", upload.none(), async (req, res) => {
    try {
        req.entry = await Entry.findById(req.params.id);
        let entry = req.entry
        if (!entry) {
            return res.status(404).end();
        }
        Object.keys(req.body).forEach(key => {
            entry[key] = req.body[key]
        });
        entry = await entry.save()
        if (entry.deleted) {
            return res.status(204).end()
        }
        res.status(201).send(entry.slug);
        } catch(err) {
            res.status(500).send(err);
        }
    })

// new entry
router.post("/entry/new", upload.none(), async (req, res) => {
    let entry = new Entry(req.body);
    try {
        await entry.save();
        res.status(201).send(entry.slug);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router