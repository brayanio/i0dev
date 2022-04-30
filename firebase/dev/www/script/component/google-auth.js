'google-auth',
`
    <button i0="google">
        <img i0="googleImg" src="./asset/google.png">
    </button>
`,
ui => {
    ui.google.onclick = async event => {
        const user = await Service.Firebase.SignIn()
        console.log(user)
        if(!user || user.error) return null
        await Service.User.Auth(user.uid, user.displayName, user.email, user.photoURL)
    }

    const googleGraphic = {
        normal: './asset/google.png',
        hover: './asset/google_hover.png',
        pressed: './asset/google_pressed.png'
    }

    ui.google.onmouseover = e => ui.googleImg.src = googleGraphic.hover
    ui.google.onmouseout = e => ui.googleImg.src = googleGraphic.normal
    ui.google.onmousedown = e => ui.googleImg.src = googleGraphic.pressed
    ui.google.onmouseup = e => ui.googleImg.src = googleGraphic.normal
},
{
    '[i0=google]': {
        border: 'none',
        background: 'none',
        padding: 'none'
    }
}