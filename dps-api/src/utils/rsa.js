const fs = require("fs");
const jwt = require("jsonwebtoken");
// http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
// use "utf8" to get string instead of byte array  (1024 bit key)
let privateKey = fs.readFileSync("./private.key", "utf8"); // to sign JWT
let publicKey = fs.readFileSync("./public.key", "utf8"); 	// to verify JWT

exports.sign = (payload) => {
    // Token signing options
    let contingencies = {
        issuer: 	process.env.JWT_AUTHORITY,
        algorithm: 	process.env.JWT_ALGORITHM // options RS256, RS384, RS512
    }
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