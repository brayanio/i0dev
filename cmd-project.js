const fs = require('fs').promises
const START = new Date()

const isWin = process.platform === "win32";
const osPath = path => isWin ? path.split('/').join('\\') : path

const args = [...process.argv]
args.shift()
args.shift()
args.shift()

const name = args[0]

const runPath = process.cwd() + ''
console.log(runPath, name)

