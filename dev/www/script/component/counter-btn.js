'counter-btn',
`
<button i0="btn">Counter: 0</button>
`,
(ui, props) => {
    let count = props
    ui.btn.innerText = 'Counter: ' + count
    ui.btn.onclick = () => {
        count ++
        ui.btn.innerText = 'Counter: ' + count
    }
},
{
    '[i0=btn]': {
        'background': 'white',
        'font-weight': 'bold',
        'font-size': '1.2em',
        'padding': '6px',
        'margin': '6px',
        ...Service.Css.Clickable()
    }
}