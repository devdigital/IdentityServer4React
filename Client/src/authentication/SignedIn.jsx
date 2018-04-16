import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import userManager from '~/authentication/user-manager'
import { actions } from 'redux-router5'

class SignedIn extends Component {
  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() =>
          this.props.navigateTo('home', {}, { replace: true })}
        errorCallback={() =>
          this.props.navigateTo('error', {}, { replace: true })}
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
