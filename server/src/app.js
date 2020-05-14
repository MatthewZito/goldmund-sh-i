require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const multer  = require("multer");
const upload = multer();

require("./db/mongoose.js");
const app = express();
const port = process.env.PORT || 5000;
const Entry = require("./db/models/entry.js");

app.use(express.json());
app.use(cors());


// pull all entries/index thereof
app.get('/', async (req, res) => {
    try {
        let entries = await Entry.find({ deleted: false }).sort({ createdAt: 'desc' })
        res.send(entries);
    } catch(err) {
        console.log(err)
        res.status(500).send(err);
    }
});

// view entry
app.get('/entry/:slug', async (req, res) => {
    try {
        let entry = await Entry.findOne({ slug: req.params.slug, deleted: false })
        if (entry === null) {
            return res.status(500).end(); 
        }
        res.send({ data: entry });
    } catch(err) {
        res.status(500).send(err);
    }
});

// TODO add handling for deleted set to true (cannot prompt redirect)
app.patch('/entry/:id', upload.none(), async (req, res) => {
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
app.post('/entry/new', upload.none(), async (req, res) => {
    let entry = new Entry(req.body);
    try {
        await entry.save();
        res.status(201).send(entry.slug);
    } catch(err) {
        res.status(400).send(err);
    }
});

app.listen(port, () => console.log(`[+} Listening on port ${port}...`));

/* COMPONENT,       ENDPOINT,         DATA REQ,     DATA RES
*  vestibule        /                 entry idx     n/a
*  comms            /email           n/a          email data
*  entry            /entry/:slug       entry body    n/a
*  admin            /entry/new         n/a           new entry
*  admin            /entry/:id/edit   entry        entry (also handles delete flag)
*/


// edit entry
// app.put('/entry/:id', async (req, res, next) => {
//     req.entry = await Entry.findById(req.params.id)
//     next()
// }, saveEntryAndRedirect('edit'))

// function saveEntryAndRedirect(path) {
//     return async (req, res) => {
//       let entry = req.entry
//       entry.title = req.body.title
//       entry.subtitle = req.body.subtitle
//       entry.imgurl = req.body.imgurl
//       entry.content = req.body.content
//       entry.deleted = req.body.deleted
//       try {
//         entry = await entry.save()
//         res.redirect(`/entry/${entry.slug}`)
//       } catch (err) {
//         res.redirect(`/entry/${path}`) //, { entry: entry }
//       }
//     }
//   }