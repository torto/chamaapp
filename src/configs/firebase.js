import * as firebase from "firebase"

import config from "./keys"
firebase.initializeApp(config.firebase)

const databaseRef = firebase.database().ref()
export const todosRef = databaseRef.child("todos")
export const authRef = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
