'home',
`
    <div class="card">
        <h1>Home ${Service.User.Count()}</h1>
        <p>
            <a href="#support" class="link">Support</a>
        </p>
        <input i0="counter" placeholder="loading..." class="input">
        <form class="layer">
            <b>Capper</b>
            <br>
            <input i0="cap" class="input">
            <button i0="send" class="button">Send</button>
        </form>
    </div>
`,
(ui, props) => {

    i0.load('counter-btn', 5, ui.counter)

    ui.cap.onkeyup = () => ui.cap.value = ui.cap.value.toLowerCase()

    ui.send.onclick = async e => {
        e.preventDefault()
        let cap = await i0.fetch('test', {caps: true, str: ui.cap.value})
        ui.cap.value = cap
        console.log('send', cap)
    }
},
{
    '[i0=cap]': {
        'font-size': '1.2em'
    }
}