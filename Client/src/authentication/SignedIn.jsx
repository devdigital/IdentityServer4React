import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import userManager from '~/authentication/user-manager'
import toJS from '~/to-js'
import { actions } from 'redux-router5'

class SignedIn extends Component {
  successCallback = user => {
    this.props.navigateTo('home')
  }

  errorCallback = error => {
    console.log('props', this.props)
    this.props.navigateTo('error')
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

const mapDispatchToProps = dispatch =>
  console.log(actions) ||
  bindActionCreators(
    {
      navigateTo: actions.navigateTo,
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(SignedIn)
