#!/usr/bin/env node
require("dotenv").config();
module.exports = {
    localStore: "tmp/ephemera.json",
    sessionStore: "tmp/session.json",
    basePath: process.env.HOST || "http://localhost:5000",
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}