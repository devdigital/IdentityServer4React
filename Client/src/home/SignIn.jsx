import React, { Component } from 'react'
import userManager from '~/authentication/user-manager'

class SignIn extends Component {
  signIn = event => {
    event.preventDefault()
    userManager.signinRedirect()
  }

  render() {
    return (
      <div>
        <button onClick={this.signIn}>Sign in</button>
      </div>
    )
  }
}

export default SignIn
