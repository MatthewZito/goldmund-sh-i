/*
This is an experimental script. If you stumbled across this, do NOT use. This script
overrides a given node core module
*/
const fs = require("fs");
const path = require("path");
const wrap = (module, name, wrapper) => {
  const core = module[name]
  module[name] = wrapper(core)
}
wrap(fs, "readFileSync", (readFileSync) => (...args) => {
  const [ filepath ] = args
  const fullpath = path.resolve(filepath)
  if (fullpath.startsWith("/system/")) {
    throw new Error(`[-] You do not have permissions to access file ${args}`)
  }
  return readFileSync(...args)
})
Object.freeze(fs)

// node -r hijack.js script.js