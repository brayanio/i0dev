const fs = require('fs')
const START = new Date()

const isWin = process.platform === "win32";
const osPath = path => isWin ? path.split('/').join('\\') : path

/* all commands should be run from the dev folder except for the project command */

const runPath = process.cwd() + ''
const last = runPath.substring(runPath.length - 4, 4)
if(last !== '/dev' && last !== '\\dev')
    return console.error('i0 error: Command must be ran within the dev folder.')

const projectPath = runPath.substring(0, runPath.length - 4)

const script = projectPath + osPath('/build/index.js')
if(fs.existsSync(script))
require('./cmd-build.js')( () => require(script) )
module.exports = {}