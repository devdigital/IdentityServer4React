import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { signOut } from '~/redux/modules/sign-out'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toJS from '~/redux/to-js'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import Loader from '~/chrome/Loader'
import Error from '~/chrome/Error'

class Home extends Component {
  signOut = () => {
    this.props.signOut()
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />
    }

    if (this.props.error) {
      return <Error />
    }

    const { user } = this.props
    if (user && !user.expired) {
      return <Dashboard user={user} signOut={this.signOut} />
    }

    if (this.props.data) {
      return <div />
    }

    return <SignIn />
  }
}

Home.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  error: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.get('oidc').user,
  isLoading: state.get('signOut').get('isLoading'),
  data: state.get('signOut').get('data'),
  error: state.get('signOut').get('error'),
})

const mapDispatchToProps = dispatch => bindActionCreators({ signOut }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Home))
