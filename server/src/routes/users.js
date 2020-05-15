const express = require("express");
const User = require("../db/models/user.js");
const router = new express.Router();

// create new user
router.post("/user", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

// login
router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch(err) {
        res.status(400).end();
    }
})

// fetch users
router.get("/user", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err);
    }
})

// fetch user by id
router.get("/user/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

// update user by id
router.patch("/user/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid update operation." });
    }
    try {
        const user = await User.findById(req.params.id);
        updates.forEach(update => user[update] = req.body[update]);
        await user.save()
        
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

// delete user by id
router.delete("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router