'user-card',
`
    <div class="card mb-3">
        <div class="row">
            <div class="col-4">
                <img i0="photo" class="img-fluid rounded-start">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <b i0="displayName"></b>
                </div>
            </div>
        </div>
    </div>
`,
async (ui, props) => {
    const {auth, user} = props
    ui.photo.src = auth.photoURL
    ui.displayName.innerText = user.username
    i0.onbroadcast('update-username', username => {
        ui.displayName.innerText = username
    })
}