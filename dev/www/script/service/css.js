const css = (style, val) => { return {[style]: val} }
const csslist = (...ar) => Object.assign({}, ...ar)

Service.Css.BoxShadow = cssvar => 
    css('box-shadow', `0 3px 5px ${Service.Cssvar[cssvar]()}`)

Service.Css.Clickable = () => csslist(
    Service.Css.BoxShadow('Standard'),
    css('cursor', `pointer`),
    css('border', `none`),
    css('border-radius', `6px`)
)