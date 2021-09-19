'counter-btn',
`
<button i0="btn" class="button">Counter: 0</button>
`,
(ui, props) => {
    let count = props
    ui.btn.innerText = 'Counter: ' + count
    ui.btn.onclick = () => {
        count ++
        ui.btn.innerText = 'Counter: ' + count
    }
}