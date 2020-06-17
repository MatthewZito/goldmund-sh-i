/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @param {func} callback 
 * @summary X-Powered-By header middleware.
 * @description Lies about server type by randomly selecting server identifier and applying to X-Powered-By header.
 *     Intended to squander the time of script-kiddies too stupid to realize this code is publicly available on GitHub.
 *     Really just a joke, though.
 */
const setXPoweredByHeader = (req, res, next) => {
    const commonServerSignatures = ["PHP/5.4.45","PHP/5.5.9-1ubuntu4.7", "PleskLin", "PHP/5.3.29", "ASP.NET", "PHP/5.4.39-0+deb7u2", "ZendServer 8.5.0" , "ASP.NET"]
    let randomServerSignature = commonServerSignatures[Math.floor(Math.random() * commonServerSignatures.length)]
    res.setHeader("X-Powered-By", randomServerSignature )
    next()
    }

module.exports = setXPoweredByHeader