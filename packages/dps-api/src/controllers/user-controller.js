const User = require("../db/models/user-model.js");
const redisClient = require("../db/redis.js");

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

exports.logout = async (req, res) => {
    const { authorization } = req.headers
    try {
        if (authorization) {
            const token = authorization.replace("Bearer ", "");
            const reply = await redisClient.delAsync(token);
            if (!reply) {
                throw new Error("[-] Invalid token provided. This transaction has been logged.");
            }
            return res.status(204).send({ success: "[+] Session successfully terminated." });
        }
        else {
            res.status(400).send({ error: "[-] No token provided. This transaction has been logged."})
        }
    } catch(err) {
        res.status(401).send({ error: "[-] Invalid token provided. This transaction has been logged."});
    }
}