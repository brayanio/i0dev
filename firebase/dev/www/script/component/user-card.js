'user-card',
`
    <div class="layer inline-flex v-center">
        <div class="margin">
            <img i0="photo" width="64px" height="64px">
        </div>
        <div class="margin">
            <b i0="displayName"></b>
        </div>
    </div>
`,
async (ui, props) => {

    ui.photo.src = props.photoURL
    ui.displayName.innerText = props.displayName

},
{
    '[i0=photo]': {
        'border-radius': 'var(--round)'
    }
}