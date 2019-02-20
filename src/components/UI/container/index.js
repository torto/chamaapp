import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = () => ({
  root:{
    background: 'linear-gradient(135deg, #fb83fa 0%,#9261bb 100%)',
    height: '100vh'
  },
  content: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  grid: {
    position: 'relative'
  }
})

const ContainerComponent = ({classes, children}) => {
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Grid
          container
          className={classes.container}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid className={classes.grid} item xs={10} md={5}>
            {children}
          </Grid>
        </Grid>
      </main>
    </div>
  )

}

ContainerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

export default withStyles(styles)(ContainerComponent)
