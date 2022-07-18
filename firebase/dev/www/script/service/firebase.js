const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const {uid, photoURL, email, displayName} = user
        Service.User.Auth(uid, photoURL, email, displayName)
    } else console.error(user)
})

const persistentSignIn = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        var provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithRedirect(provider)
    })
    .catch((error) => {
        var errorMessage = error.message
        console.error(errorMessage)
    })

Service.Firebase.IdToken = () => firebase.auth().currentUser.getIdToken(true)
    .then(function(idToken) {
        return idToken
    }).catch(function(error) {
        var errorMessage = error.message
        console.error(errorMessage)
    })

Service.Firebase.SignIn = async () => {
    const res = await persistentSignIn();
    if(!res || res.error) return {error: res}
    const credential = res.credential
    const user = res.user

    const {uid, photoURL, email, displayName, refreshToken} = user
    const providerUID = user.providerData[0].uid
    const credentialAccessToken = credential.accessToken;
    const credentialIDToken = credential.idToken

    return {uid, photoURL, email, displayName, refreshToken, providerUID, credentialAccessToken, credentialIDToken}
}

Service.Firebase.SignOut = async () => {
    const res = await firebase.auth().signOut()
    return res
}

Service.Firebase.Get = async path => {
    const db = firebase.database()
    const res = await db.ref(path).once('value')
    return res.val()
}

Service.Firebase.On = async (path, fn) => {
    const db = firebase.database()
    const res = await db.ref(path).on('value', snap => fn(snap.val()) )
    return () => Service.Firebase.Off(path)
}

Service.Firebase.Off = async path => {
    const db = firebase.database()
    const res = await db.ref(path).off()
}

Service.Firebase.Set = async (path, obj) => {
    const db = firebase.database()
    const res = await db.ref(path).set(obj)
    return res
}

Service.Firebase.Query = async (path, query) => {
    const db = firebase.database()
    let ref = await db.ref(path)
    return await query(ref)
}