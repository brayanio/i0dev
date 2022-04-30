const serviceAccount = {
    "type": "service_account",
    "project_id": "portfolio-37dfe",
    "private_key_id": "929011440b092a8b875415e95e73e9a7c5201673",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMmB39AXm2u1XN\nAXQ5LP1HKTVyJ/gpzdNw4idj/AcrIdow8uHPSZjkQ0pKpuVVnHM1QBCMqJUz0RIP\n8AUqiV7HvkXq6hvxvm4RcnNUEnkLg4BRWW9Zk5n4BEdlibI49ZO2MPle23nB8tRr\n+HCVgp5nM0bpJDfJ1XKQY7I0Mi0B4Ge6EksjpY1e96mhSeNUWSvygBX+RepaAmTS\njG3eprqTC1krLSnhLKMUfG9K6oos51tyftdPsXP1bdjgJhcqzTaGHH3ymxZAlrce\nMIU0t3x5FsxO6aBVu9G5+Jrz+EFBew4kqIcgA7KPJT/WKSuu5lpmfZNikgUIZXWp\nMi217El3AgMBAAECggEAOorIyeYIYV9mHcQCOiCSokP1fkBIZFfROErjLg3uijZB\nXWp1PlQd9sZSM/2Etv47Nqwjd/5mijn/NGW0MP8cWT3QbT3oPuQVfuxSO2qpvnKW\nRslfxUPhs9VMSWpprLANPqrr22S2MV1EuGSttIO8I6rFVyT+metoFdl9haBy/zls\n2BEnwNsx7ZrLUuB0nBwlb+LduWoFf8NTWxrFUftOxzwh7DGfxdYcKy6qv+4vOHYk\nhMIEepfDyxCKVtZnduf2wEOtE1Ftw3nGiOdkRbukjisMuQjzCAi9Rp5NDcx/YJev\nYeLG446Z3yOjoZ+3XvcQ+WTwJaXKuwCRi9dRONeL+QKBgQC/D3YOjcEcsyYlXhxe\n65UzfYJL0gG9REnE2HThvJ5uWGNpDPoFYzOBwAlFzm+rIzQ9gPafJQJI6XPz1BU3\nl7mGKFVSo8quDyG2rF8ieQdlrKAr35fmT3xYT9k5jbvj+T73NdXkY3gkAKSIzPLO\nDR9V692yL7ul1f3Zp93H3y9XIwKBgQC8YX6HS9ay6augjw3QY/4qYfuDh+TDFxVF\nb6nqjkPqrf9BZuERYOb/HUgE52MivpAzaIakIxogoqlAUka3xIoNl973O82l8LaV\nroE2oa8vjp4ho7cxEgEr86JfFM/0gRCNYd7ogn/3m7mt0kE6pL9CijKraVK+Fp19\nNnJSpMbTnQKBgBDq4o45WQ8cgdUvNx3kiEqN43qpNsQ2hr2qWPcgB3tH0k2b+4t8\nlDP5+Bg5RkQGEvsbLzs6QLCKE11Uuyg4BBJwAdYWcLzm1BpjuuzHgLMtDOW1n7Kh\n+SWstFRXS3rNOBkVqEHX2Ox/LhJ660j5envWLcQ4W8o8X4TlS0sGZR+3AoGAeHSW\n5Yh25rxIBEi0+pWVxiAVJYvVmXG/JkE6k0MY5o0P9RAFxokB7AsbLBeQ6nyT1Gt3\n/Kh9YnTgaMKzeXpxFDQSXGCfJQaAmcGV2gsU7AHz12rKDtSGb0ZAgy/ZsWx92wnD\n8UTQ8tFer2kMUKVbrv6TW8vjHq1zUsdn3rSCdnkCgYAUOJRE+W0qe7gfRGWjmxpX\n1956+Nai6P+XutDlmRNb3Kc6CVXoawXrNYfqtk6I2C651Iv2VLW0FclrjV/D8Py/\nNXnE/h/3pvNf7Nd8nL3dUwPw5/ep5Ne6mxbMbPtQxE3vOVjwd5Ir3vcaQkRMTjcA\nqxGnMUcnv2iqMQFEjfVfNA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6q7lg@portfolio-37dfe.iam.gserviceaccount.com",
    "client_id": "109893267732366983959",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6q7lg%40portfolio-37dfe.iam.gserviceaccount.com"
}
  
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