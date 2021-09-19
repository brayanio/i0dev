let guid = (r, v) =>
'i0-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
  (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8))
  .toString(16))

// main ui
let components = {}

const _applyStyle = (el, css) => {
    if(css)
        Object.keys(css).forEach(query => {
            const rules = Object.keys(css[query])
            el.querySelectorAll(query).forEach(selectedElement => 
                rules.forEach(style => 
                    selectedElement.style[style] = css[query][style]
                )
            )
        })
}

const _geti0 = (clone, ui) => {
    Array.from(clone.querySelectorAll('[i0]')).forEach(el => {
        if(el.getAttribute('i0-nugget')) return null
        ui[el.getAttribute('i0')] = el
        el.removeAttribute('i0')
    })
}

const obj = (id, html, init, css) => {
    const template = document.createElement('template')
    template.innerHTML = html
    components[id] = {template, init, css}
}

const load = (id, props, el) => {
    if(components[id]){
        const clone = components[id].template.content.cloneNode(true)
        const ui = {}
        _applyStyle(clone, components[id].css)
        _geti0(clone, ui)
        if(components[id].init)
            components[id].init(ui, props)

        if(el) el.parentNode.replaceChild(clone, el)
        return clone
    }
}

const element = (html, init, css) => {
    const template = document.createElement('template')
    template.innerHTML = html
    const clone = template.content.cloneNode(true)
    const ui = {}
    _applyStyle(clone, css)
    _geti0(clone, ui)    
    if(init) init(ui)
    return clone
}

// routing
let routes, routeProps, app
const loadRoute = () => {
    const route = routes[location.hash]
    if(route){
        app.innerHTML = ''
        app.appendChild(load(route, routeProps))
        routeProps = undefined
    }
}
const router = (obj) => {
    app = document.createElement('app')
    routes = obj
    app.style.opacity = '0'
    loadRoute(app)
    app.style.opacity = '1'
    onhashchange = () => loadRoute()
    document.body.appendChild(app)
}
const toRoute = (hash, props) => {
    routeProps = props
    if(location.hash === hash) loadRoute()
    else location.hash = hash
}

// http
let target = 'http://localhost:4200'

const JSON_to_URLEncoded = (element,key,list) => {
    list = list || []
    if(typeof element == 'object')
        for (let idx in element)
        JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list)
    else 
        list.push(key+'='+encodeURIComponent(element))
    return list.join('&')
}

const post = body => { return {
    method: "POST",
    body: JSON_to_URLEncoded(body || {}), 
    cache: 'no-cache',
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
} }

const onFetch = (path, body) => target 
    ? fetch(
        path ? `${target}/${path}` : target, 
        post(body)
    ).then(res => res.json())
    : null

// Broadcast
let broadcasts = {}
const onbroadcast = (name, fn) => {
    if(!broadcasts[name]) broadcasts[name] = [fn]
    else broadcasts[name].push(fn)
    return {close: () => broadcasts[name] = broadcasts[name].filter(f => f !== fn)}
}
const broadcast = (name, ...props) => {
    if(broadcasts[name]) broadcasts[name].forEach(fn => fn(...props))
}
const emptybroadcast = name => broadcasts[name] = []

// i0
export default {
    obj, load, element,
    router, toRoute,
    fetch: onFetch, target: str => target = str,
    broadcast, onbroadcast, emptybroadcast,
    guid
}