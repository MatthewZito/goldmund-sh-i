#!/usr/bin/env node
const yargs = require("yargs")
/**
 * @description This package is a command-line CMS and sessions manager for goldmund.sh.
 */

const argv = yargs
  .commandDir("commands")
  .completion()
  .demandCommand(1, "[-] You must specify a command.")
  .usage("\n☯ Goldmund CLI ☯\n\nUsage: $0 <command> [options]")
  .help().alias("help", "h")
  .version("version", "0.1.0").alias("version", "V")
  .epilog("☯ Created by M Zito ☯").argv
  