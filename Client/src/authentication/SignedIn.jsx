import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import userManager from '~/authentication/user-manager'
import { actions } from 'redux-router5'

class SignedIn extends Component {
  successCallback = user => {
    this.props.navigateTo('home', {}, { replace: true })
  }

  errorCallback = error => {
    console.dir(error)
    this.props.navigateTo('error', {}, { replace: true })
  }

  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.successCallback}
        errorCallback={this.errorCallback}
      >
        <div />
      </CallbackComponent>
    )
  }
}

SignedIn.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ navigateTo: actions.navigateTo }, dispatch)

export default connect(state => ({}), mapDispatchToProps)(SignedIn)
