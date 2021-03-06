import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Row from './UI/row'
import Add from './UI/add'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import Button from '@material-ui/core/Button'

const strings = {
  title: 'Todos List',
  addTask: 'Add Task',
  empty: 'To add a new to-do click in the buttom below.',
  signOut: 'Sign Out'
}

export class TodoComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenDialog: false,
      inputs: {
        description: '',
        deadline: moment(),
        priority: 2,
        complete: false,
        id: ''
      }
    }

    this.toggleDialog = this.toggleDialog.bind(this)

    this.handleChangeInputs = this.handleChangeInputs.bind(this)
    this.handleSaveOrUpdateToDo = this.handleSaveOrUpdateToDo.bind(this)
    this.handleToogleModalWithValues = this.handleToogleModalWithValues.bind(this)
    this.handleChangeIsComplete = this.handleChangeIsComplete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)

    this.renderRowTodos = this.renderRowTodos.bind(this)
  }

  componentDidMount() {
    const { fetchToDos, auth } = this.props
    fetchToDos(auth.uid)
  }

  toggleDialog() {
    const { isOpenDialog } = this.state
    if(isOpenDialog) this.resetValuesInState()
    this.setState({ isOpenDialog: !isOpenDialog })
  }

  handleChangeInputs(input) {
    return (e) => {
      const value = e.target ? e.target.value : e
      this.setState({
        inputs:{
          ...this.state.inputs,
          [input]: value
        }
      })
    }
  }

  handleSaveOrUpdateToDo(updateTask, isToToogleDialog = true) {
    const { addOrUpdateToDo, auth } = this.props

    const values = updateTask ? updateTask : this.state.inputs
    values.deadline = moment(values.deadline).valueOf()

    addOrUpdateToDo(values, auth.uid)
    return this.resetValuesInState(isToToogleDialog)
  }

  handleChangeIsComplete(id) {
    const  { todos } = this.props
    return () => {
      const value = todos[id]
      value.complete = !value.complete
      this.handleSaveOrUpdateToDo(value, false)
    }
  }

  handleDelete(id) {
    const  { auth, removeToDo, todos } = this.props
    return () => {
      removeToDo(todos[id].id, auth.uid)
    }
  }

  resetValuesInState(isToToogleDialog) {
    if(isToToogleDialog) this.toggleDialog()
    this.setState({
      inputs: {
        description: '',
        deadline: moment(),
        priority: 2,
        complete: false,
        id: ''
      }
    })
  }

  changeInputsValuesToState(id = null) {
    const { todos } = this.props
    if(id != null)return this.setState({
      inputs: {
        ...todos[id],
        deadline: moment(todos[id].deadline),
      }
    })
  }

  handleToogleModalWithValues(id) {
    return () => {
      this.changeInputsValuesToState(id)
      this.toggleDialog()
    }
  }

  handleSignOut() {
    const  { signOut } = this.props
    return () => {
      signOut()
    }
  }

  render() {
    const { classes, fullScreen, todos } = this.props
    const { isOpenDialog } = this.state

    return (
      <Container>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Typography variant="title" gutterBottom>
              {strings.title}
            </Typography>

            <List className={classes.list}>
              {this.renderRowTodos()}
            </List>

            {!todos.length && (<Typography>
              {strings.empty}
            </Typography>)}

            <Add
              isOpen={isOpenDialog}
              fullScreen={fullScreen}
              handleClose={this.toggleDialog}
              handleChange={this.handleChangeInputs}
              inputs={this.state.inputs}
              handleSave={this.handleSaveOrUpdateToDo} />

            <Fab
              color="primary"
              aria-label={strings.addTask}
              className={classes.fab}
              onClick={() => this.toggleDialog()}>
              <AddIcon />
            </Fab>

            <Button color="primary" onClick={this.handleSignOut()} className={classes.button}>
              {strings.signOut}
            </Button>

          </CardContent>
        </Card>
      </Container>
    )
  }

  renderRowTodos() {
    const { todos } = this.props
    return todos.map((item, key) => (<Row
      key={item.id}
      id={key}
      handleClick={this.handleToogleModalWithValues(key)}
      handleDelete={this.handleDelete}
      handleChangeIsComplete={this.handleChangeIsComplete(key)}
      data={item} />))
  }
}

TodoComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  fetchToDos: PropTypes.func,
  addOrUpdateToDo: PropTypes.func,
  signOut: PropTypes.func,
  removeToDo: PropTypes.func,
  todos: PropTypes.array,
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

export default TodoComponent
