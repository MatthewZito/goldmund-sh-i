#!/usr/bin/env node
require("dotenv").config({ path: `${__dirname}/../.env` });
module.exports = {
    localStore: `${__dirname}/../tmp/ephemera.json`,
    sessionStore: `${__dirname}/../tmp/session.json`,
    basePath: process.env.DPS_BASE_URL,
    editor: process.env.EDITOR || "vi",
    email: process.env.CLI_EMAIL,
    password: process.env.CLI_PASSWORD
}