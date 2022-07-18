'home',
`
    <div class="card">
        <h1>Home</h1>
        <p>
            <a href="#support" class="link">Support</a>
        </p>
        <form class="layer">
            <b class="header">New Todo</b>
            <input i0="todo" class="input">
            <button i0="create" class="button">Create</button>
        </form>
        <div i0="todos"></div>
    </div>
`,
async (ui, props) => {

    
    ui.create.onclick = async e => {
        e.preventDefault()
        if(ui.todo.value){
            await Service.Todo.Create(ui.todo.value)
            ui.todo.value = ''
        }
    }

    
    i0.onbroadcast('todo-update', () => {
        ui.todos.innerHTML = ''
        Service.Todo.Todos().forEach(todo => 
            ui.todos.appendChild( i0.load('todo', todo) )
        )
    })

    await Service.Todo.List()
}