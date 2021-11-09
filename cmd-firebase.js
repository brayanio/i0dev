const fs = require('fs')
const path = require("path")
const START = new Date()

const isWin = process.platform === "win32";
const osPath = path => isWin ? path.split('/').join('\\') : path

const args = [...process.argv]
args.shift()
args.shift()
args.shift()

const name = args[0]

const runPath = process.cwd() + ''
const i0Path = __dirname

const project = i0Path + osPath(`/firebase`)
const target = runPath + osPath(`/${name}`)

const copyFolder = async (from, to) => {
    if (fs.existsSync(to)) 
        return console.error('i0 error: ['  + target + '] already exists.' )
    fs.mkdirSync(to)
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) 
            fs.copyFileSync(path.join(from, element), path.join(to, element))
        else 
            copyFolder(path.join(from, element), path.join(to, element))
    })
}

copyFolder(project, target)

console.log('firebase project created', new Date() - START)