import { fetchToDos, addOrUpdateToDo, removeToDo } from 'modules/firebase/actions/database'
import { signOut } from 'modules/firebase/actions/auth'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TodoComponent from './todo'

const styles = () => ({
  root: {
    width: '100%',
    maxHeight: '25rem',
    overflow: 'auto',
    flex: 1,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '1.5rem',
  },
  fab: {
    position: 'absolute',
    bottom: '-1.45rem',
  },
  list: {
    width: '100%'
  }
})

const mapStateToProps = ({ auth, todos }) => ({ auth, todos })
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchToDos,
  addOrUpdateToDo,
  removeToDo,
  signOut
}, dispatch)
const redux = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const style = withStyles(styles, { withTheme: true })
const dialog = withMobileDialog()

export default style(redux(dialog(TodoComponent)))
