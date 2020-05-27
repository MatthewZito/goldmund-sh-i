const chalk = require("chalk");
const { logout } = require("../utils/requests.js");

const destroyAuth = async () => {
    try {
        let response = logout(token);
        if (!response) {
            throw new Error();
        }
    } catch(err) {
        console.log(chalk.red(err));
    }
}

exports.command = "auth"
exports.desc = "Authorize a session"
exports.handler = () => {
    destroyAuth();
}
