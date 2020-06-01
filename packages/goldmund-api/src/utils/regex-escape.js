/**
 * @param {String} query The pre-sanitized, user-provided query string.
 * @returns {String} The query, with all specified chars escaped.
 * @summary Escape possible typo characters from user query.
 */
const escapeRegex = (query) => {
    return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
module.exports = escapeRegex;