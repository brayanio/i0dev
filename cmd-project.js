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

const copyFolder = async (from, to) => {
    if (!fs.existsSync(to))
        fs.mkdirSync(to)
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) 
            fs.copyFileSync(path.join(from, element), path.join(to, element))
        else 
            copyFolder(path.join(from, element), path.join(to, element))
    })
}

const project = i0Path + osPath(`/project`)
const target = runPath + osPath(`/${name}`)
copyFolder(project, target)