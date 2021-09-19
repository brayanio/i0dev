//name of our i0 component
'home',
//html of our i0 component
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
//oninit of our i0 component
async (ui, props) => {

    //access elements in the html above with the i0 attribute with the ui object
    //set the onclick event of the button
    ui.create.onclick = async e => {
        //prevent the form from refreshing the page
        e.preventDefault()
        //check if the todo input has a value
        if(ui.todo.value){
            //access the services globally with the Service object
            //create a todo
            await Service.Todo.Create(ui.todo.value)
            //empty the input value
            ui.todo.value = ''
        }
    }

    //whenever Service.Todo broadcasts todo-update
    i0.onbroadcast('todo-update', () => {
        //empty the todos element of child elements
        ui.todos.innerHTML = ''
        //for each todo add a todo component to the todos element
        //create a component by calling i0.load(name, props)
        //i0.load returns an element that we add to the todos
        Service.Todo.Todos().forEach(todo => 
            ui.todos.appendChild( i0.load('todo', todo) )
        )
    })

    //calling the Todo.List is going to broadcast a todo-update
    await Service.Todo.List()

},
//css of our i0 component
{
    'h1': {
        'font-size': '2em'
    }
}