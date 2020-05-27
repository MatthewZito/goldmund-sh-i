
exports.sanitizeBody = async (req, res, next) => {
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
            return next();
        } 
    } catch(err) {
        res.status(401).send({ error: "[-] Malformed input. This transaction has been logged."})
    }
}

exports.sanitizeQuery = async (req, res, next) => {
    if (req.query) {
        const fields = Object.keys(req.query);
        const allowedFields = ["search", "lastProcessedID"]
        const isValidOperation = fields.every((field) => allowedFields.includes(field));
        for(let key in req.query) {
            if (!isValidOperation || req.query[key] === '""' || req.query[key] === "''") {
                delete req.query[key] 
            }
        }
        return next();
    } 
}
