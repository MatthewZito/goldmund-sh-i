#!/usr/bin/env node
require("dotenv").config();
module.exports = {
    localStore: "tmp/ephemera.json",
    sessionStore: "tmp/session.json",
    basePath: process.env.DPS_BASE_URL,
    email: process.env.CLI_EMAIL,
    password: process.env.CLI_PASSWORD
}