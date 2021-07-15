'counter-btn',
`
<button i0="btn">Counter: 0</button>
`,
(ui, props) => {
    let count = 0
    ui.btn.innerText = 'Counter: ' + count
    ui.btn.onclick = () => {
        count ++
        ui.btn.innerText = 'Counter: ' + count
    }
}