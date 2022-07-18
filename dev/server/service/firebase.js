const serviceAccount = {}  
  
var admin = require("firebase-admin");

// Initialize the app with a service account, granting admin privileges
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-37dfe.firebaseio.com"
})

Service.Firebase.VerifyIdToken = idToken => admin.auth(app).verifyIdToken(idToken)
    .then((decodedToken) => {
        return decodedToken
    })
    .catch((error) => {
        console.error(error.message)
        return {error: error.message}
    })

Service.Firebase.AuthCreate = idToken => admin.auth(app).createUser({
    email: idToken.email,
    emailVerified: idToken.emailVerified,
    uid: idToken.uid,
    displayName: idToken.name,
    photoURL: idToken.picture,
    disabled: false,
})

Service.Firebase.AuthLoad = uid => admin.auth(app).getUser(uid)

Service.Firebase.AuthUpdate = (idToken, obj) => admin.auth(app).updateUser({
    email: idToken.email,
    emailVerified: idToken.emailVerified,
    uid: idToken.uid,
    displayName: idToken.name,
    photoURL: idToken.picture,
    disabled: false,
    ...obj
})

Service.Firebase.Get = async path => {
    const db = admin.database()
    const ref = db.ref(path)
    const res = await ref.once('value')
    return res.val()
}

Service.Firebase.Set = async (path, obj) => {
    const db = admin.database()
    const ref = db.ref(path)
    const res = await ref.set(obj)
    return res || {msg: 'set complete'}
}