const sanitizeQuery = async (req, res, next) => {
    try {
        if (req.body) {
            const fields = Object.keys(req.body);
            const allowedFields = ["subject", "content", "email", "password"]
            const isValidOperation = fields.every((field) => allowedFields.includes(field));
            for(let key in req.body) {
                if (!isValidOperation || req.body[key] instanceof Object) {
                    throw new Error("nested key found");
                }
            }
            return next()
        } 
    } catch(err) {
        res.status(401).send({ error: "[-] Malformed input. This transaction has been logged."})
    }
}

module.exports = sanitizeQuery