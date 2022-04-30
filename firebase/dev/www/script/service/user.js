let user

Service.User.Get = async () => user

Service.User.Auth = async (uid, displayName, email, photoURL) => {
    const idToken = await Service.Firebase.IdToken()
    if(!user) user = {uid, displayName, email, photoURL}
    const res = await i0.fetch('user', {cmd: 'auth', idToken})
    console.log('auth', res)
    if(res && res.uid) user = res
    i0.broadcast('auth', user)
}