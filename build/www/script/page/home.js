import i0 from '../i0.js';
import Service from '../service/_service.js';
i0.obj('home',
`
    <h1>Home ${Service.User.Count()}</h1>
    <p>
        <a href="#support">Support</a>
    </p>
    <input i0="counter" placeholder="loading...">
    <br>
    <b>Capper</b>
    <form>
        <input i0="cap">
        <button i0="send">Send</button>
    </form>
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
        'font-size': '2em'
    }
});
export default null;