const axios = require("axios");
const chalk = require("chalk");
const { basePath, email, password } = require("../config/config.js");

const login = async () => {
    try {
        let response = await axios({
            method: "post", 
            url: `${basePath}/user/login`,
            data: {
                email,
                password
            }
        });
            if (response.status !== 201) {
                throw new Error();
            }
            else {
                return await response.data.token
          }
    } catch(err) {
        console.log(chalk.red(`\n[-] Failed to authenticate. See: ${err}`));
    }
}

const logout = async (token) => {
    try {
        let response = await axios({
            method: "post", 
            url: `${basePath}/user/logout`,
            headers: {"Authorization" : `Bearer ${token}` }
        });
            if (response.status !== 204) {
                throw new Error();
            }
            else {
                return true
          }
    } catch(err) {
        console.log(chalk.red(`\n[-] Failed to authenticate. See: ${err}`));
    }
}

const fetchEntry = async (slug) => {
    try {
        let response = await axios({
            method: "get", 
            url: `${basePath}/entry/${slug}`,
        });
            if (response.status !== 200) {
                throw new Error();
            }
            else {
                return await response.data
          }
    } catch(err) {
        console.log(chalk.red(`\n[-] Failed to fetch entry ${slug} See: ${err}`));
    }
}

const pushEntry = async (id, data, token) => {
    try {
        let response = await axios({
            method: id ? "patch" : "post", 
            url: `${basePath}/entry/${id ? id : "new"}`,
            data: data,
            headers: {"Authorization" : `Bearer ${token}` }
        });
            if (response.status !== 201 && 204) {
                throw new Error("\n[-] Failed to process " + id ? `entry ${id}` : "new entry" );
            }
            else {
                return await response
          }
    } catch(err) {
        console.log(chalk.red(err));
    }
}


module.exports = {
    login,
    logout,
    fetchEntry,
    pushEntry
}