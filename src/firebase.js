import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCia4_bfNEDrgnLnBj4Wnt7y5yaXKkqb9Q",
    authDomain: "socialnetwork-86cf0.firebaseapp.com",
    databaseURL: "https://socialnetwork-86cf0.firebaseio.com",
    projectId: "socialnetwork-86cf0",
    storageBucket: "socialnetwork-86cf0.appspot.com",
    messagingSenderId: "488910860903"
}

const app = firebase.initializeApp(config)

export const storageImagesRef = app.storage().ref().child('images')
export const usersRef = app.database().ref('users/')
export const auth = app.auth()