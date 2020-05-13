require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
require("./db/mongoose.js");
const app = express();
const port = process.env.PORT || 5000;
const Entry = require("./db/models/entry.js");



app.use(express.json());
app.use(cors());

function saveEntryAndRedirect(path) {
    return async (req, res) => {
      let entry = req.entry
      entry.title = req.body.title
      entry.subtitle = req.body.subtitle
      entry.imgurl = req.body.imgurl
      entry.content = req.body.content
      entry.deleted = req.body.deleted
      try {
        entry = await entry.save()
        res.redirect(`/entry/${entry.slug}`)
      } catch (err) {
        res.redirect(`/entry/${path}`) //, { entry: entry }
      }
    }
  }

// app.get("/api/:id", (req, res) => {
//     res.send(req.params.id)
// })

app.get('/', (req, res) => {
    Entry.find().sort({ createdAt: 'desc' }).then(entries =>{
        res.send({ data: entries });
    }).catch(err => {
        res.status(500).send(err);
    })
    
  })

// view entry
app.get('/entry/:slug', (req, res) => {
    Entry.findOne({ slug: req.params.slug }).then(entry => {
        if (entry == null) {
            return res.redirect("/"); // do this clientside
        }
        res.send({ data: entry });
    }).catch(err => {
        res.status(500).send(err);
    })
    
});

// edit entry
app.put('/entry/:id', async (req, res, next) => {
    req.entry = await Entry.findById(req.params.id)
    next()
}, saveEntryAndRedirect('edit'))

// new entry
app.post('/entry/new', (req, res) => {
    let entry = new Entry(req.body);
    entry.save().then(() => {
        res.status(201).send(entry);
    }).catch(err => {
        res.status(400).send(err);
    })

    
  })

app.listen(port, () => console.log(`[+} Listening on port ${port}...`));

/* COMPONENT,       ENDPOINT,         DATA REQ,     DATA RES
*  vestibule        /                 entry idx     n/a
*  comms            /email           n/a          email data
*  entry            /entry/:slug       entry body    n/a
*  admin            /entry/new         n/a           new entry
*  admin            /entry/:id/edit   entry        entry (also handles delete flag)
*/