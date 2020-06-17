#!/usr/bin/env node
require("dotenv").config({ path: `${__dirname}/../.env` });
module.exports = {
    localStore: `${__dirname}/../tmp/ephemera.json`,
    sessionStore: `${__dirname}/../tmp/session.json`,
    basePath: process.env.GOLDMUND_API_BASE_URL,
    editor: process.env.EDITOR || "vi",
    email: process.env.CLI_EMAIL,
    password: process.env.CLI_PASSWORD,
    cloudinaryName: process.env.CLOUD_NAME,
    cloudinaryKey: process.env.API_KEY,
    cloudinarySecret: process.env.API_SECRET,
    cloudinaryDir: `${__dirname}/../tmp/${process.env.LOCAL_CDN_DIR}`
}