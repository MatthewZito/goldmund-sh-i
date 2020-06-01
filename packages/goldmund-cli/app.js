#!/usr/bin/env node
const yargs = require("yargs");

/**
 * @description This pa
 */
yargs
  .commandDir("commands")
  .demandCommand(1, "[-] You must specify a command.")
  .help()
  .argv