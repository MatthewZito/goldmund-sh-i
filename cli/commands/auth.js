const chalk = require("chalk");
const { authorize } = require("../utils/fs.js");
const { login } = require("../utils/requests.js");

const establishAuth = async () => {
    try {
        let token = await login();
        if (!token) {
            return
        }
        if (token && !token.success === "true") {
            throw new Error("\n[-] An error occurred during token generation.");
        }
        else {
            authorize({ token: token.token });
            console.log(chalk.green("\n[+] Successfully authenticated; new session established."));
        }
    } catch(err) {
        console.log(chalk.red(err));
    }
}

exports.command = "auth"
exports.desc = "Authorize a session"
exports.handler = () => {
    establishAuth();
}
