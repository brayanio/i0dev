let authUser, user

Service.User.GetAuth = async () => authUser
Service.User.Get = async () => user

Service.User.Auth = async (uid, displayName, email, photoURL) => {
    const idToken = await Service.Firebase.IdToken()
    if(!user) user = {uid, displayName, email, photoURL}
    const res = await i0.fetch('user', {cmd: 'auth', idToken})
    // console.log('auth', res)
    if(res && res.uid) authUser = res
    await Service.Firebase.On(`User/${uid}`, userRes => user = userRes)
    user = await Service.User.LoadUser(uid)
    i0.broadcast('auth', user)
}

Service.User.LoadUser = uid => Service.Firebase.Get(`User/${uid}`)

Service.User.Reload = async () => {
    const res = Service.User.LoadUser(user.uid)
    user = res
    return user
}