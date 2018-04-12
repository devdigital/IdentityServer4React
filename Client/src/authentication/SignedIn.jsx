import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'react-router-redux'
import userManager from '~/authentication/user-manager'

class SignedIn extends Component {
  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => this.props.dispatch(push('/'))}
        errorCallback={error => {
          console.error(error)
          this.props.dispatch(push('/error'))
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    )
  }
}

export default SignedIn
