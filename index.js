const fs = require('fs').promises
const settings = require('./dev/index.json')
const START = new Date()

const isWin = process.platform === "win32";
const osPath = path => isWin ? path.split('/').join('\\') : path

const Path = {
    Global: __dirname,
    System: osPath(`${__dirname}/system`),
    Project: process.cwd(),
    Dev: process.cwd() + osPath('/dev'),
    Build: process.cwd() + osPath('/build')
}

const DevPaths = {
    Component: Path.Dev + osPath('/www/script/component'),
    Page: Path.Dev + osPath('/www/script/page'),
    Service: Path.Dev + osPath('/www/script/service'),
    Style: Path.Dev + osPath('/www/style')
}

const wwwPath = e => osPath(`${Path.Dev}/www${e?'/'+e:''}`)
const devPath = e => osPath(`${Path.Dev}${e?'/'+e:''}`)
const buildPath = e => osPath(`${Path.Build}${e?'/'+e:''}`)
const systemPath = e => osPath(`${Path.System}${e?'/'+e:''}`)

let loadWWW = async () => {
    const components = await fs.readdir(DevPaths.Component)
    const pages = await fs.readdir(DevPaths.Page)
    const services = await fs.readdir(DevPaths.Service)
    const styles = await fs.readdir(DevPaths.Style)
    console.clear()
    console.log('i0build')
    console.log('pages', pages)
    console.log('components', components)
    console.log('services', services)
    console.log('styles', styles)

    const finalComponents = []
    const finalPages = []
    const finalServices = []

    components.forEach(async url => {
        let e = await loadComponent(url)
        finalComponents.push(e)
    })
    pages.forEach(async url => {
        let e = await loadPage(url)
        finalPages.push(e)
    })
    services.forEach(async url => {
        let e = await loadService(url)
        finalServices.push(e)
    })

    const check = () => 
        finalComponents.length === components.length 
        && finalPages.length === pages.length
        && finalServices.length === services.length

    if(!check()){
        loadWWW = () => check() ? {
            components: finalComponents, 
            pages: finalPages, 
            services: finalServices,
            styles
        } : {error: 'loading'}
        return {error: 'loading'}
    }
    return {
        components: finalComponents, 
        pages: finalPages, 
        services: finalServices,
        styles
    }
}

const loadPage = async (url) => {
    const str = await fs.readFile(devPath(`www/script/page/${url}`))
    const imp = (name, path) => `import ${name} from '${path}';\n`
    const final
        = imp('i0', '../i0.js')
        + imp('Service', '../service/_service.js')
        + `i0.obj(${str.toString()});`
        + '\nexport default null;'

    // console.log('loadPage', devPath(`www/script/page/${url}`))

    let name = url.substr(0, 1).toUpperCase() + url.substr(1, url.length - 4)

    return {value: final, url, name}
}

const loadComponent = async (url) => {
    const str = await fs.readFile(devPath(`www/script/component/${url}`))
    const imp = (name, path) => `import ${name} from '${path}';\n`
    const final
        = imp('i0', '../i0.js')
        + imp('Service', '../service/_service.js')
        + `i0.obj(${str.toString()});`
        + '\nexport default null;'

    // console.log('loadComponent', devPath(`www/script/component/${url}`))

    let name = url.substr(0, 1).toUpperCase() + url.substr(1, url.length - 4)

    return {value: final, url, name}
}

const loadService = async (url) => {
    const str = await fs.readFile(devPath(`www/script/service/${url}`))
    const imp = (name, path) => `import ${name} from '${path}';\n`
    const final 
        = imp('i0', '../i0.js')
        + imp('Service', '../service/_service.js')
        + str.toString()
        + '\nexport default null;'

    // console.log('loadService', devPath(`www/script/service/${url}`))

    let name = url.substr(0, 1).toUpperCase() + url.substr(1, url.length - 4)

    return {value: final, url, name}
}

// load www files

let interval = setInterval(async () => {
    const res = await loadWWW()
    if(res && !res.error) {
        loadBuild(res)
        clearInterval(interval)
    }
}, 100)


const loadBuild = async files => {
    try{
        await fs.rmdir(buildPath('www'), { recursive: true });
        await fs.rmdir(buildPath('server'), { recursive: true });
        await fs.unlink(buildPath('index.js'));
        await fs.unlink(buildPath('package.json'));
    }catch(e){}
    try{
        await fs.mkdir(buildPath())
    }catch(e){}
    await fs.mkdir(buildPath('www'))
    await fs.mkdir(buildPath('www/style'))
    await fs.mkdir(buildPath('www/script'))
    await fs.mkdir(buildPath('www/script/component'))
    await fs.mkdir(buildPath('www/script/page'))
    await fs.mkdir(buildPath('www/script/service'))
    await loadSystems(files)
    files.components.forEach(component => {
        fs.appendFile(buildPath(`www/script/component/${component.url}`), component.value)
    })
    files.pages.forEach(page => {
        fs.appendFile(buildPath(`www/script/page/${page.url}`), page.value)
    })
    let serviceObj = {}
    files.services.forEach(service => {
        fs.appendFile(buildPath(`www/script/service/${service.url}`), service.value)
        serviceObj[service.name] = {}
    })
    fs.appendFile(buildPath(`www/script/service/_service.js`), 'export default ' + JSON.stringify(serviceObj))
}

const copyAndPlace = async (filePath, buildPath, aug) => {
    const str = await fs.readFile(filePath)
    await fs.appendFile(buildPath, aug(str.toString()))
}

const loadSystems = async files => {
    await copyAndPlace(systemPath('index.html'), buildPath('www/index.html'), s=>{
        s = s.replace('$title$', settings.title)
        const link = href => `<link href="${href}" rel="stylesheet" type="text/css" />`
        let stylesHtml = ''
        files.styles.forEach(url => stylesHtml += link(`./style/${url}`) + '\n')
        s = s.replace('$style$', stylesHtml)
        if(settings.styles){
            let styleText = ''
            settings.styles.forEach(href => styleText += `<link href="${href}" rel="stylesheet" type="text/css" />\n`)
            s = s.replace('$styles$', styleText)
        } else s = s.replace('$styles$', '')
        if(settings.scripts){
            let scriptText = ''
            settings.scripts.forEach(src => scriptText += `<script src="${src}"></script>\n`)
            s = s.replace('$scripts$', scriptText)
        } else s = s.replace('$scripts$', '')
        return s
    })
    await copyAndPlace(systemPath('i0.js'), buildPath('www/script/i0.js'), e=>e)
    files.styles.forEach(async url => {
        await copyAndPlace(devPath(`www/style/${url}`), buildPath(`www/style/${url}`), e=>e)
    })

    // index
    let index = ''
    files.services.forEach(service => index += `import "./service/${service.url}";\n`)
    files.components.forEach(component => index += `import "./component/${component.url}";\n`)
    files.pages.forEach(page => index += `import "./page/${page.url}";\n`)
    index += 'import i0 from "./i0.js";\n'
    index += `i0.target('${settings.target}');\n`
    index += `i0.router(${JSON.stringify(settings.routes)});`
    fs.appendFile(buildPath('www/script/index.js'), index)

    loadServer(files)
}

const loadServer = async files => {

    await fs.mkdir(buildPath('server'))
    await fs.mkdir(buildPath('server/route'))
    await fs.mkdir(buildPath('server/service'))
    await fs.mkdir(buildPath('server/util'))
    await copyAndPlace(systemPath('guid.js'), buildPath('server/util/guid.js'), e=>e)
    await copyAndPlace(systemPath('salt.js'), buildPath('server/util/salt.js'), e=>e)
    await copyAndPlace(systemPath('server.js'), buildPath('server/util/server.js'), e=>e)

    //routes
    const routes = await fs.readdir(devPath('server/route'))
    routes.forEach(async url => {
        const str = await fs.readFile(devPath(`server/route/${url}`))
        copyAndPlace(systemPath('route.js'), buildPath(`server/route/${url}`), s => {
            s = s.replace('$route$', url.substring(0, url.length-3))
            s = s.replace('$guts$', str.toString())
            return s
        })
    })
    
    //service
    const services = await fs.readdir(devPath('server/service'))
    let servicesObj = {}
    services.forEach(url => {
        servicesObj[url.substr(0,1).toUpperCase() + url.substr(1, url.length - 4)] = {}
    })
    fs.appendFile(buildPath('server/_service.js'), `module.exports = ${JSON.stringify(servicesObj)}`)
    services.forEach(async url => {
        copyAndPlace(devPath(`server/service/${url}`), buildPath(`server/service/${url}`), s => {
            return "const Service = require('../_service.js');\n" + s
        })
    })

    //index
    await copyAndPlace(systemPath('index.js'), buildPath('index.js'), s => {
        let requires = ''
        services.forEach(url => requires += `require('./server/service/${url}');\n`)
        routes.forEach(url => requires += `require('./server/route/${url}');\n`)
        s = s.replace('$routes$', requires)
        s = s.replace('$port$', settings.port || '4200')
        return s
    })

    // package.json
    await copyAndPlace(systemPath('package.json'), buildPath('package.json'), s => {
        s = s.replace('$package$', settings.package)
        let nodeText = ''
        if(settings.node_packages)
            Object.keys(settings.node_packages).forEach(pkg => 
                nodeText += `"${pkg}": "${settings.node_packages[pkg]}",\n`
            )
        s = s.replace('"node_packages":"",', nodeText)
        return s
    })

    console.log('build complete', new Date() - START)
}