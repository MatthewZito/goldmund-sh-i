const redisClient = require("../db/redis.js");
const { verify } = require("../utils/rsa.js");
/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @param {func} callback 
 * @description Authentication middleware. Parses for auth headers.
 * If auth header provided: query cache db for user-provided token to ascertain if session is live.
 * Else, return generated token and persist at Redis caching layer.
 */
const authenticate = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (authorization) {
            const token = authorization.replace("Bearer ", "");
            const reply = await redisClient.getAsync(token);
            if (!reply) {
                throw new Error("[-] A failure occurred at the caching layer.");
            }
            
            const verification = verify(token);
            if (!verification) {
                throw new Error("[-] Invalid token. This transaction has been logged.");
            }
            return res.send({ _id: reply });
        }
        else {
            return next();
        }
    } catch(err) {
        res.status(401).send({ error: "[-] Authentication required. This transaction has been logged."});
    }
}

module.exports = authenticate