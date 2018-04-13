import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'react-router-redux'
import userManager from '~/authentication/user-manager'
import toJS from '~/to-js'
import { withRouter } from 'react-router-dom'

class SignedIn extends Component {
  successCallback = user => {
    this.props.dispatch(push('/'))
  }

  errorCallback = error => {
    this.props.dispatch(push('/error'))
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

export default withRouter(connect()(toJS(SignedIn)))
