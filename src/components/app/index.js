import React from 'react'
import { Route, withRouter, Switch} from 'react-router-dom'
import Login from '../login'
import requireAuth from '../requireAuth'
import todo from '../todo'
const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={withRouter(Login)} />
      <Route exact path="/app" component={withRouter(requireAuth(todo))} />
      <Route component={withRouter(Login)} />
    </Switch>
  </React.Fragment>
)

export default App
