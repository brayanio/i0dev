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
const i0Path = __dirname

const copyFolder = async (from, to) => {
    fs.mkdir(to)
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) 
            fs.copyFileSync(path.join(from, element), path.join(to, element))
        else 
            copyFolderSync(path.join(from, element), path.join(to, element))
    })
}

copyFolder(i0Path, runPath + osPath(`/${name}`))