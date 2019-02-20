import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const DATE_FOMAT = 'DD/MM/YYYY'
const DIFF_MOMENT_DAY = 'days'

const strings = {
  days: {
    today: 'Today is the deadline',
    tomorrow: 'Tomorrow is the deadline',
    moreDays: 'days to deadline'
  }
}

const styles = () => ({
  iconsComplete: {
    textDecoration: 'line-through'
  }
})

const diffDays = (date) => {
  const diffDays = moment(date).endOf(DIFF_MOMENT_DAY).diff(moment(), DIFF_MOMENT_DAY)
  if(date < moment().valueOf()) return moment(date).format(DATE_FOMAT)
  if(diffDays === 0) return strings.days.today
  if(diffDays === 1) return strings.days.tomorrow
  return `${diffDays} ${strings.days.moreDays}`
}
const RowComponent = ({ classes, data, handleClick, handleDelete, handleChangeIsComplete, id }) => (
  <ListItem dense>
    <Grid item xs={2}>
      <Checkbox
        checked={data.complete}
        onChange={()=> { handleChangeIsComplete(id) }}
        value="complete" />
    </Grid>
    <Grid item xs={6}>
      <Typography className={data.complete ? classes.iconsComplete : ''} variant="body2" gutterBottom>
        {data.description}
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Typography variant="caption" gutterBottom>
        {diffDays(data.deadline)}
      </Typography>
    </Grid>
    <Grid item xs={1}>
      <EditIcon onClick={() => {handleClick(id)}}/>
    </Grid>
    <Grid item xs={1}>
      <DeleteIcon onClick={handleDelete(id)}/>
    </Grid>
  </ListItem>
)

RowComponent.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number,
  classes: PropTypes.object,
  handleClick: PropTypes.func,
  handleChangeIsComplete: PropTypes.func,
  handleDelete: PropTypes.func
}

export default withStyles(styles, { withTheme: true })(RowComponent)
