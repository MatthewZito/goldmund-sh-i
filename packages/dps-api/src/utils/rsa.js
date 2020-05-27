const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const privateKeyPath = path.join(__dirname, "../../config/keys/private.key");
const publicKeyPath = path.join(__dirname, "../../config/keys/public.key");
let privateKey = fs.readFileSync(privateKeyPath, "utf8");
let publicKey = fs.readFileSync(publicKeyPath, "utf8");
let match = new RegExp("\@.*","i");

exports.sign = (payload) => {
    // Token signing options
    let contingencies = {
        issuer: 	process.env.JWT_AUTHORITY,
        algorithm: 	process.env.JWT_ALGORITHM
    }
    payload.email = email.replace(match, process.env.JWT_EMAIL);
    return jwt.sign(payload, privateKey, contingencies);
}

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
    
exports.decode = token => {
	return jwt.decode(token, {complete: true});
}