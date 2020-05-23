const { Types } = require("mongoose");
const redisClient = require("../db/redis.js");

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @param {func} callback 
 * @description Authorization middleware; enforces JWT verification via cache db and sets author field.
 */
const authorize = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (!authorization) {
            throw new Error("Nope.")
        }
        const token = authorization.replace("Bearer ", "");
        const reply = await redisClient.getAsync(token);
        if (!reply) {
            throw new Error("Nope.");
        }
        req.author = Types.ObjectId.createFromHexString(reply)
        return next();
    } catch(err) {
        console.log(err)
        res.status(401).send({ error: "[-] Authorization required. This transaction has been logged."});
    }
}

module.exports = authorize

// const data = new WeakMap();
// data.set(req, reply);
