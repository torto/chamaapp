import { authRef, provider } from "configs/firebase"
import { FETCH_USER } from "./types"

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      })
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      })
    }
  })
}

export const signIn = () => () => {
  authRef
    .signInWithPopup(provider)
    .then(() => {})
}

export const signOut = () => () => {
  authRef
    .signOut()
    .then(() => {})
}
