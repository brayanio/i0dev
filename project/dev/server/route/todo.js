console.log('cmd:', body.cmd)
switch(body.cmd){
    case 'create': return Service.Todo.Create( body.text )
    case 'list': return Service.Todo.List()
    case 'remove': return Service.Todo.Remove( body.id )
    case 'complete': return Service.Todo.Complete( body.id, body.isComplete )
}