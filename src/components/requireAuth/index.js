import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
      authenticated: PropTypes.bool
    }

    componentWillMount() {
      if (!this.props.auth) {
        this.context.router.history.push("/")
      }
    }

    shouldComponentUpdate(nextProps) {
      if (!nextProps.auth) {
        this.context.router.history.push("/")
      }
    }

    render() {
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />
      }
      return null
    }
  }

  function mapStateToProps({ auth }) {
    return { auth }
  }

  Authentication.propTypes = {
    router: PropTypes.object,
    auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  }

  return connect(mapStateToProps)(Authentication)
}
