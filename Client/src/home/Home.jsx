import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import toJS from '~/redux/to-js'
import Dashboard from './Dashboard'
import SignIn from './SignIn'

class Home extends Component {
  render() {
    const { user } = this.props
    return user ? <Dashboard user={user} /> : <SignIn />
  }
}

Home.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.get('oidc').user,
})

export default connect(mapStateToProps)(toJS(Home))
