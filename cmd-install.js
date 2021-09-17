const fs = require('fs').promises
const START = new Date()

const isWin = process.platform === "win32";
const osPath = path => isWin ? path.split('/').join('\\') : path

/* all commands should be run from the dev folder except for the project command */

const runPath = process.cwd() + ''
const last = runPath.substr(runPath.length - 4, 4)
if(last !== '/dev' && last !== '\\dev')
    return console.error('! i0 error: Command must be ran within the dev folder.')

const projectPath = runPath.substr(0, runPath.length - 4)

const { exec } = require('child_process')
console.log(`cd ${projectPath + osPath('/build')} && npm run i && cd ${runPath}`)
const child = exec(`cd ${projectPath + osPath('/build')} && npm i && cd ${runPath}`, (err, out, derr) => {
    console.log(out)
})

module.exports = {}