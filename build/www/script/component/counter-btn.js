import i0 from '../i0.js';
import Service from '../service/_service.js';
i0.obj('counter-btn',
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
});
export default null;