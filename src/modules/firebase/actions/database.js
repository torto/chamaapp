import { todosRef } from "configs/firebase"
import { FETCH_TODOS } from "./types"

export const addOrUpdateToDo = (newToDo, uid) => async () => {
  if(newToDo.id) return todosRef.child(uid).child(newToDo.id).update(newToDo)
  todosRef
    .child(uid)
    .push()
    .set(newToDo)
}

export const removeToDo = (completeToDoId, uid) => async () => {
  todosRef
    .child(uid)
    .child(completeToDoId)
    .remove()
}

export const fetchToDos = uid => async dispatch => {
  todosRef.child(uid).orderByChild('priority').on("value", snapshot => {
    const orderValues = []
    snapshot.forEach(function(child) {
      const value = child.val()
      value.id = child.key
      orderValues.push(value)
    })
    dispatch({
      type: FETCH_TODOS,
      payload: orderValues
    })
  })
}
