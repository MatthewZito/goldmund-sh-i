/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @param {func} callback 
 * @summary Body sanitization middleware.
 * @description Sanitizes request body by filtering incoming body object against `allowedFields`.
 *     Throws error if any request field contains nested data.
 */
exports.sanitizeBody = async (req, res, next) => {
    try {
        if (req.body) {
            const fields = Object.keys(req.body);
            const allowedFields = ["subject", "content", "email", "password"]
            const isValidOperation = fields.every((field) => allowedFields.includes(field));
            for(let key in req.body) {
                if (!isValidOperation || req.body[key] instanceof Object) {
                    throw new Error("[-] Nested key found. This transaction has been logged.");
                }
            }
            return next();
        } 
    } catch(err) {
        res.status(401).send({ error: "[-] Malformed input. This transaction has been logged."})
    }
}

/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @param {func} callback 
 * @summary Query parameter sanitization middleware.
 * @description Sanitizes query params by filtering incoming body object's query fields against `allowedFields`.
 *     Deletes all non-compliant and empty keys, for security and to prevent needless database queries, respectively.
 */
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
