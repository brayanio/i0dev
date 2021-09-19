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
const last = runPath.substr(runPath.length - 4, 4)
if(last !== '/dev' && last !== '\\dev')
    return console.error('i0 error: Command must be ran within the dev folder.')

const projectPath = runPath.substr(0, runPath.length - 4)

const systemFolder = i0Path + osPath(`/project/system`)
const target = projectPath + osPath(`/system`)

const copyFolder = async (from, to) => {
    if (fs.existsSync(to)) 
        try{ 
            fs.rmdirSync(to, { recursive: true }) 
            fs.unlinkSync(to) 
        } catch(e){}
    if (!fs.existsSync(to)) 
        fs.mkdirSync(to)
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) 
            fs.copyFileSync(path.join(from, element), path.join(to, element))
        else 
            copyFolder(path.join(from, element), path.join(to, element))
    })
}

copyFolder(systemFolder, target)

console.log('project updated', new Date() - START)