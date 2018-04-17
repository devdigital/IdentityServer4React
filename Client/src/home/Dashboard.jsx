import React, { Component } from 'react'
import PropTypes from 'prop-types'
import userManager from '~/authentication/user-manager'

const User = ({ user }) => (
  <div>
    <h2>Token</h2>
    <dl>
      <dt>id_token</dt>
      <dd>{user.id_token}</dd>
      <dt>access_token</dt>
      <dd>{user.access_token}</dd>
      <dt>token_type</dt>
      <dd>{user.token_type}</dd>
      <dt>scope</dt>
      <dd>{user.scope}</dd>
      <dt>expires_at</dt>
      <dd>{user.expires_at}</dd>
    </dl>
    <h2>Profile</h2>
    <dl>
      <dt>sid</dt>
      <dd>{user.profile.sid}</dd>
      <dt>sub</dt>
      <dd>{user.profile.sub}</dd>
      <dt>auth_time</dt>
      <dd>{user.profile.auth_time}</dd>
      <dt>idp</dt>
      <dd>{user.profile.idp}</dd>
    </dl>
  </div>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
}

class Dashboard extends Component {
  signOut = event => {
    event.preventDefault()
    userManager.signoutRedirect()
  }

  render() {
    const { user } = this.props

    if (!user) {
      return <div>You are not signed in.</div>
    }

    return (
      <div>
        <p>You are signed in.</p>
        <User user={user} />
        <button onClick={this.signOut}>Sign out</button>
      </div>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Dashboard
