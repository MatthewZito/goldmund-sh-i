
// // create new user
// router.post("/user", async (req, res) => {
//     const user = new User(req.body);
//     try {
//         // save happens in gen handler
//         const token = await user.generateAuthToken();
//         await user.save();
//         res.status(201).send({ user, token });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });


// // fetch users
// router.get("/user", authenticate, async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// // fetch user by id
// router.get("/user/self", authenticate, async (req, res) => {
//     res.send(req.user)
// })

// // update user by id
// router.patch("/user/:id", async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["name", "email", "password"]
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValidOperation) {
//         return res.status(400).send({ error: "Invalid update operation." });
//     }
//     try {
//         const user = await User.findById(req.params.id);
//         updates.forEach(update => user[update] = req.body[update]);
//         await user.save()
        
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

// // delete user by id
// router.delete("/user/:id", async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);

//         if (!user) {
//             return res.status(404).send();
//         }

//         res.send(user);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// router.post("/user/test", sanitizeQuery, async (req, res) => {
//     try{
//         const user = await User.findOne({ email: req.body.email });
//         res.send(user)
//     } catch(err) {
//         res.status(400).end();
//     }
// })