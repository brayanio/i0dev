let todoObj

Service.Todo.Todos = () => {
    console.log('todoObj', todoObj)
    return Object.values( todoObj )
}

Service.Todo.Create = async (text) => {
    const res = await i0.fetch('todo', {cmd: 'create', text})
    console.log('Todo.Create', res)
    todoObj[res.id] = res
    i0.broadcast('todo-update', todoObj)
}

Service.Todo.List = async () => {
    const res = await i0.fetch('todo', {cmd: 'list'})
    console.log('Todo.List', res)
    todoObj = res
    i0.broadcast('todo-update', todoObj)
}

Service.Todo.Remove = async id => {
    const res = await i0.fetch('todo', {cmd: 'remove', id})
    console.log('Todo.Remove', res)
    delete todoObj[id]
    i0.broadcast('todo-update', todoObj)
}

Service.Todo.Complete = async (id, isComplete) => {
    const res = await i0.fetch('todo', {cmd: 'complete', id, isComplete})
    console.log('Todo.Complete', res)
    todoObj[id].isComplete = isComplete
}