let todos = {}

class Todo{
    constructor(text){
        this.id = Service.Util.Guid()
        this.text = text
        this.date = new Date()
        this.isComplete = false
    }
}

Service.Todo.Create = (text) => {
    const todo = new Todo(text)
    todos[todo.id] = todo
    return todo
}

Service.Todo.List = () => todos

Service.Todo.Remove = id => {
    delete todos[id]
    return todos
}

Service.Todo.Complete = (id, isComplete) => {
    if(todos[id]) {
        todos[id].isComplete = isComplete
        return todos[id]
    }
    return {error: 'todo not found'}
}