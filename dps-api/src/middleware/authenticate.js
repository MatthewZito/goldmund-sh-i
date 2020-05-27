const redisClient = require("../db/redis.js");

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
            // verify jwt here
            if (!reply) {
                throw new Error("[-] A failure occurred at the caching layer.");
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



// const jwt = require("jsonwebtoken");
// const User = require("../src/db/models/user.js");


// const authenticate = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization").replace("Bearer ", "");
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({_id: decoded._id, "tokens.token" : token });
        
//         if (!user) {
//             throw new Error("nope");
//         }
//         req.token = token
//         req.user = user
//         return next();
//     } catch(err) {
//         res.status(401).send({ error: "Authentication required. This transaction has been logged."});
//     }

// }

// module.exports = authenticate