const firebaseConfig = {
    apiKey: "AIzaSyCdJPZ19vDUYX8fUSpeTDc7TZTB2CEpAhU",
    authDomain: "portfolio-37dfe.firebaseapp.com",
    databaseURL: "https://portfolio-37dfe.firebaseio.com",
    projectId: "portfolio-37dfe",
    storageBucket: "portfolio-37dfe.appspot.com",
    messagingSenderId: "51180410857",
    appId: "1:51180410857:web:6194e5af844f29e7"
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

Service.Firebase.Get = async user => {
    const db = firebase.database()
    const res = await db.ref('user/' + user.uid).once('value')
    return res.val()
}

Service.Firebase.Set = async (user, obj) => {
    const db = firebase.database()
    const res = await db.ref('user/' + user.uid).set(obj)
    return res
}