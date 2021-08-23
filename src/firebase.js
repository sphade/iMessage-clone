import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVtKNPpC1JrNd2aDunpTf-fJCAvG4glyE",
    authDomain: "i-message-clone-40c90.firebaseapp.com",
    projectId: "i-message-clone-40c90",
    storageBucket: "i-message-clone-40c90.appspot.com",
    messagingSenderId: "266642973811",
    appId: "1:266642973811:web:fb85c02cf165a92e4e7606",
    measurementId: "G-CNZJMB1NH8"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };
export default db 