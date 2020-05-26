const axios = require("axios");
const { basePath } = require("../config/config.js");

const getEntry = async(id) => {
    try {
        const response = await axios.get(`${basePath}/${id}`);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const postEntry = async(id, data, token) => {
    try {
        const response = await axios.post(`${basePath}/${id}`);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const patchEntry = async(id, data, token) => {
    try {
        const response = await axios.patch(`${basePath}/${id}`);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getEntry,
    postEntry,
    patchEntry
}