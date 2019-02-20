import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Container from '../UI/container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'

import { signIn, fetchUser } from 'modules/firebase/actions/auth'

export const styles = () => ({
  root: {
    width: '100%',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

const strings = {
  title: 'Login - Google',
  button: 'Login',
  message: 'To login, click on the button below.'
}

export class LoginComponent extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  shouldComponentUpdate(nextProps) {
    const { history } = this.props
    if(nextProps.auth) history.push('/app')
    return true
  }

  render() {
    const {
      classes,
      signIn
    } = this.props
    return (
      <Container>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Typography component="h2" variant="display1" gutterBottom>
              {strings.title}
            </Typography>
            <Typography gutterBottom>
              {strings.message}
            </Typography>
            <Fab
              variant="extended"
              aria-label={strings.button}
              onClick={() => signIn()}
              className={classes.fab}>
              {strings.button}
            </Fab>
          </CardContent>
        </Card>
      </Container>
    )
  }

}

LoginComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getResults: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  history: PropTypes.object,
  signIn: PropTypes.func,
  fetchUser: PropTypes.func
}

export const mapStateToProps = ({ auth }) => ({ auth })

export const mapDispatchToProps = dispatch => bindActionCreators({
  signIn,
  fetchUser
}, dispatch)


export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent))
