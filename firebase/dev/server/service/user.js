class User{
    constructor(token, create){
        const {uid, name, email, picture} = token
        this.uid = uid
        this.displayName = name
        this.email = email
        this.photoURL = picture
        if(create)
            this.create(token)
    }
    userExport(){
        const {uid, email, displayName, photoURL} = this
        return {uid, email, displayName, photoURL}
    }
    async load(){
        const res = await Service.Firebase.AuthLoad(this.uid)
        if(!res || res.error || !res.uid) return {error: res}
        Object.keys(res).forEach(key => this[key] = res[key])
        return this
    }
    async create(token){
        const {uid, displayName, email, photoURL} = this
        const save = {uid, displayName, email, photoURL}
        const res = await Service.Firebase.AuthCreate(token)
        return res
    }
    async update(){
        const {uid, displayName, email, photoURL} = this
        const save = {uid, displayName, email, photoURL}
        const res = await Service.Firebase.AuthUpdate(uid, this)
        return res
    }
}

Service.User.Auth = async idToken => {
    const token = await Service.Firebase.VerifyIdToken(idToken)
    if(token.error) return token
    const user = await new User(token).load()
    if(user && !user.error && user.uid) return user.userExport()
    const res = await new User(token).create()
    return res
}