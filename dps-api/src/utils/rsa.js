const fs 		= require('fs');
const jwt 		= require('jsonwebtoken');
// http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
// use 'utf8' to get string instead of byte array  (1024 bit key)
let privateKey 	= fs.readFileSync("./private.key", 'utf8'); // to sign JWT
let publicKey 	= fs.readFileSync("./public.key", 'utf8'); 	// to verify JWT

exports.sign = (payload, options) => {
        // Token signing options
        /*
			sOptions = {
				issuer: "Authorization/Resource/This server",
				subject: "iam@user.me", 
				audience: "Client_Identity" // this should be provided by client
			}
		*/
		let claims = {
			issuer: 	options.issuer,
			algorithm: 	"RS256" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
		};
		return jwt.sign(payload, privateKey, claims);
	},

exports.verify = (token, options) => {
		/*
			vOption = {
				issuer: "Authorization/Resource/This server",
				subject: "iam@user.me", 
				audience: "Client_Identity" // this should be provided by client
			}		
		*/
		let verifyClaims = {
			issuer: 	options.issuer,
			algorithm: 	["RS256"]
		};
		try {
			return jwt.verify(token, publicKey, verifyClaims);
		}catch(err){
			return false;
		}
    }
    
exports.decode = (token) => {
		return jwt.decode(token, {complete: true});
	}