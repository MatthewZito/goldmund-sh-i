const User = require("../db/models/user-model.js");

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.status(201).send({ token });
    } catch(err) {
        console.log(err)
        return res.status(400).end();
    }
}