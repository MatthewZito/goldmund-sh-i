const jwt = require("jsonwebtoken");
const User = require("../src/db/models/user.js");


const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decoded._id, "tokens.token" : token });
        
        if (!user) {
            throw new Error("nope");
        }
        
        req.user = user
        next();
    } catch(err) {
        res.status(401).send({ error: "Authentication required. This transaction has been logged ;-)"})
    }

}

module.exports = auth