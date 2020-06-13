#!/usr/bin/env node
const axios = require("axios");
const chalk = require("chalk");
const { basePath, email, password } = require("../config/config.js");

/**
 * @description  Automate login process and return resulting session token.
 * @returns {String} RSA encrypted token object.
 */
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
        console.log(chalk.red(`[-] Failed to authenticate. See: ${err}\n`));
    }
}

/**
 * @param {String} token RSA encrypted token object.
 * @description Nullifies session on issuing authority.
 * @returns {Boolean} Returns true if logout successful, else throw error.
 */
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
        console.log(chalk.red(`[-] Failed to deauthenticate. See: ${err}\n`));
    }
}

/**
 * @param {String} slug The slug (URI identifier) of the given entry.
 * @description Pulls given entry from API via resource URI.
 * @returns {Object} Entry data which corresponds to given slug input.
 */
const fetchEntry = async (slug) => {
    try {
        let response = await axios({
            method: "get", 
            url: `${basePath}/entries/${slug}`,
        });
            if (response.status !== 200) {
                throw new Error();
            }
            else {
                return await response.data
          }
    } catch(err) {
        console.log(chalk.red(`[-] Failed to fetch entry ${slug} See: ${err}\n`));
    }
}

/**
 * @param {String} id The id (URI identifier) of the given entry.
 * @param {Object} data Entry data currently holding residence in local entry template.
 * @param {String} token RSA encrypted token object.
 * @description Pushes the current local entry template to server. If entry ID exists, the entry is of 
 * type update and is therefore sent to the PATCH endpoint. Else, the entry is new and is sent to the new entry endpoint.
 * @returns {String} The API response - either null or the newly created resource's slug URI. 
 */
const pushEntry = async (id, data, token) => {
    try {
        let response = await axios({
            method: id ? "patch" : "post", 
            url: `${basePath}/entries/${id ? id : "new"}`,
            data: data,
            headers: {"Authorization" : `Bearer ${token}` }
        });
            if (response.status !== 201 && 204) {
                throw new Error("[-] Failed to process " + id ? `entry ${id}\n` : "new entry\n" );
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