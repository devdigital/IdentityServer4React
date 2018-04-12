import React, { Component } from 'react'
import { connect } from 'react-redux'
import userManager from '~/authentication/user-manager'

class Home extends Component {
  signIn = event => {
    event.preventDefault()
    userManager.signinRedirect()
  }

  render() {
    const { user } = this.props

    if (user) {
      return <div>You are signed in.</div>
    }

    return (
      <div>
        <button onClick={this.signIn}>Sign in</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.get('oidc').user,
})

export default connect(mapStateToProps)(Home)
