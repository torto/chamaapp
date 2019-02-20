import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './firebase/reducers/auth'
import todos from './firebase/reducers/todos'

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  todos
})
