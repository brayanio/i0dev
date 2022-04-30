'home',
`
    <div class="card">
        <div class="flex space-between">
            <h1>Home</h1>
            <button class="link hidden" i0="logout">Log out</button>
        </div>
        <div i0="auth">
            <input i0="googleAuth">
        </div>
        <div i0="home" class="hidden">
            <input i0="userCard" class="hidden">
            <div class="layer">
                <b i0="username"></b>
                <input class="input" placeholder="Username" i0="usernameInput">
                <button class="button" i0="setUsername">Set</button>
            </div>
        </div>
    </div>
`,
async (ui, props) => {

    i0.load('google-auth', {}, ui.googleAuth)

    i0.onbroadcast('auth', async user => {
        if(user && !user.error){
            ui.auth.classList.add('hidden')
            ui.home.classList.remove('hidden')
            ui.logout.classList.remove('hidden')
            i0.load('user-card', user, ui.userCard)
            const data = await Service.Firebase.Get(user)
            console.log(data)
            if(data){
                if(data.username) {
                    ui.username.innerText = data.username
                    ui.usernameInput.classList.add('hidden')
                    ui.setUsername.classList.add('hidden')
                }
            }
        } else console.error(user)
    })

    ui.setUsername.onclick = async () => {
        const user = await Service.User.Get()
        if(ui.usernameInput.value && ui.usernameInput.value.length >= 3){
            Service.Firebase.Set(user, {username: ui.usernameInput.value})
        }
    }
    
    ui.logout.onclick = async () => {
        const res = await Service.Firebase.SignOut()
        location.reload()
    }

}