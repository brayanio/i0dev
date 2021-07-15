const fs = require('fs').promises
const { exec } = require("child_process");

const Path = {
    Global: __dirname,
    System: `${__dirname}/system`,
    Project: process.cwd().replace('/dev', ''),
    Dev: process.cwd(),
    Build: process.cwd().replace('/dev', '/build'),
}
const Package = require('./package.json')

const args = process.argv.slice(2)
console.log(args, `node ${Path.Project}/build.js`)

if(args.length === 0) return console.log('i0 v' + Package.version)
if(args[0] === 'build') {
    return exec(`node ${Path.Project}/build.js`, (er, out, der)=>{
        console.log(out, der);
    })
}