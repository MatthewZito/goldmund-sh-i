#!/usr/bin/env node
const yargs = require("yargs")
/**
 * @description This package is a command-line CMS and sessions manager for goldmund.sh.
 */

const argv = yargs
  .commandDir("commands")
  .demandCommand(1, "[-] You must specify a command.")
  .help().argv
  