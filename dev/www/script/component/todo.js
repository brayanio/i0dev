'todo',
`
    <div class="layer flex space v-align">
        <div class="flex column center">
            <b class="header" i0="text"></b>
            <small i0="date" class="margin"></small>
        </div>
        <div class="flex v-align" i0="desc">
            <input type="checkbox" i0="isComplete">
            <button class="button" i0="x">x</button>
        </div>
        <div class="flex v-align hidden" i0="confirm">
            <button class="button" i0="remove">Remove</button>
            <button class="button" i0="cancel">Cancel</button>
        </div>
    </div>
`,
(ui, props) => {
    
    ui.text.innerText = props.text
    ui.date.innerText = props.date.substr(0, 10)
    ui.isComplete.checked = props.isComplete
    ui.isComplete.onchange = () => Service.Todo.Complete(props.id, ui.isComplete.checked)
    ui.x.onclick = () => {
        ui.desc.classList.add('hidden')
        ui.confirm.classList.remove('hidden')
    }
    ui.cancel.onclick = () => {
        ui.desc.classList.remove('hidden')
        ui.confirm.classList.add('hidden')    
    }
    ui.remove.onclick = () => Service.Todo.Remove(props.id)

},
{
    '.layer': {
        'border-radius': '9px',
        'margin': 'var(--margin)'
    }
}