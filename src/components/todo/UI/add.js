import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import PRIORITYS from '../prioritys'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

const strings = {
  title: 'Add/Edit To-do',
  description: 'Add or edit your task.',
  inputs: {
    description: 'Description',
    priority: 'Priority',
    deadline: 'Deadline'
  }
}

const AddToDoComponent = ({
  isOpen,
  handleClose,
  handleSave,
  inputs,
  fullScreen,
  handleChange
}) => (
  <Dialog
    fullScreen={fullScreen}
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title">{strings.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {strings.description}
      </DialogContentText>
      <form noValidate>
        <TextField
          value={inputs.description}
          margin="dense"
          id="description"
          label={strings.inputs.description}
          type="text"
          onChange={handleChange('description')}
          fullWidth />
        <Select
          label={strings.inputs.priority}
          value={inputs.priority}
          fullWidth
          onChange={handleChange('priority')}
          inputProps={{
            name: 'prioritys',
            id: 'prioritys',
          }} >
          <MenuItem value={2}>{PRIORITYS[2]}</MenuItem>
          <MenuItem value={1}>{PRIORITYS[1]}</MenuItem>
          <MenuItem value={0}>{PRIORITYS[0]}</MenuItem>
        </Select>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            margin="normal"
            label={strings.inputs.deadline}
            value={inputs.deadline}
            onChange={handleChange('deadline')}
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { handleSave() }} color="primary">
        Save/Update
      </Button>
    </DialogActions>
  </Dialog>
)

AddToDoComponent.propTypes = {
  isOpen: PropTypes.bool,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  handleChange: PropTypes.func,
  inputs: PropTypes.object,
  fullScreen: PropTypes.bool
}

export default AddToDoComponent
