require("dotenv").config();
module.exports = {
    localStore: "tmp/ephemera.json",
    basePath: process.env.HOST || "http://localhost:5000",
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}