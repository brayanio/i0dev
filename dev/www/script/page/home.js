'home',
`
<div class="container">
    <br>
    <div class="card">
        <div class="card-body">
            <div class="mb-3">
                <h1>Home</h1>
            </div>
            <div class="mb-3">
                <a href="#support">Support</a>
            </div>
            <div i0="auth">
                <input i0="googleAuth">
            </div>
            <div i0="home" class="d-none">
                <input i0="userCard" class="d-none">
                <div class="">
                    <div class="row m-0">
                        <div class="col-8">
                            <input class="form-control" placeholder="Username" i0="usernameInput">
                        </div>
                        <div class="col-4 text-center">
                            <button class="btn btn-warning" i0="setUsername">Set</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`,
async (ui, props) => {

    i0.load('google-auth', {}, ui.googleAuth)

    let auth
    i0.onbroadcast('auth', async userAuth => {
        if(userAuth && !userAuth.error){
            auth = userAuth
            ui.auth.classList.add('d-none')
            ui.home.classList.remove('d-none')
            let user = await Service.User.Reload()
            console.log(user)
            i0.load('user-card', {auth, user}, ui.userCard)
        } else console.error(user)
    })

    ui.setUsername.onclick = async () => {
        if(ui.usernameInput.value && ui.usernameInput.value.length >= 3){
            Service.Firebase.Set(`User/${auth.uid}/username`, ui.usernameInput.value)
            i0.broadcast('update-username', ui.usernameInput.value)
            ui.usernameInput.value = ''
        }
    }

}