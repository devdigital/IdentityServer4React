import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'react-router-redux'
import userManager from '~/authentication/user-manager'
import toJS from '~/to-js'
import { withRouter } from 'react-router-dom'

class SignedIn extends Component {
  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => this.props.dispatch(push('/'))}
        errorCallback={error => {
          console.dir(error)
          this.props.dispatch(push('/error'))
        }}
      >
        <div />
      </CallbackComponent>
    )
  }
}

export default withRouter(connect()(toJS(SignedIn)))
