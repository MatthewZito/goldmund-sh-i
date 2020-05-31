const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

/* Constants */

const privateKeyPath = path.join(__dirname, "../../config/keys/private.key");
const publicKeyPath = path.join(__dirname, "../../config/keys/public.key");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");
const match = new RegExp("\@.*","i");


/* Methods */

/**
 * @param {Object} payload The payload object, used for JWT signing.
 * @returns {Object} The resulting JWT token object.
 * @summary Signs JWT.
 * @description Collates objects payload, contingencies; signs together with private key.
 *     Enforces server-side issuing authority, enforces server-side JWT algorithm.
 */
exports.sign = (payload) => {
    // Token signing options
    let contingencies = {
        issuer: 	process.env.JWT_AUTHORITY,
        algorithm: 	process.env.JWT_ALGORITHM
    }
    payload.email = payload.email.replace(match, process.env.JWT_EMAIL);
    return jwt.sign(payload, privateKey, contingencies);
}

/**
 * @param {Object} token The JWT token object to be verified.
 * @returns {Boolean} The validity of the given token, denoted as boolean values.
 * @summary Validates and verifies authenticity and integrity of given token object.
 * @description Utilizes contingencies, public key to validate given token object.
 */
exports.verify = (token) => {
    let verifyContingencies = {
        issuer: 	process.env.JWT_AUTHORITY,
        algorithm: 	process.env.JWT_ALGORITHM
    }
    try {
        return jwt.verify(token, publicKey, verifyContingencies);
    } catch(err) {
        return false;
    }
}

/**
 * @param {Object} token The JWT token object.
 * @returns {String} The token value.
 * @summary Decode given token object.
 */
exports.decode = token => {
	return jwt.decode(token, {complete: true});
}