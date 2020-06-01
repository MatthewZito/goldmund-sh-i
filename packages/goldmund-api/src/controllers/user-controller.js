const User = require("../db/models/user-model.js");
const redisClient = require("../db/redis.js");

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @returns A server response status commensurate with login status. If user session exists, return token object.
 * @summary Instantiate new User session.
 * @description Pulls sanitized credentials, as provided by user. 
 *     Queries database for user, generates user-contingent token.
 */
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

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @returns A server response status and message commensurate with logout status. Message types: error, success.
 * @summary Destroys existing User session.
 * @description Pulls session token from Authorization headers. Clears token in Redis cache.
 */
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