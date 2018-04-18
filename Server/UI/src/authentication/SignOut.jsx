import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSignOutContext } from '~/redux/modules/sign-out-context'
import queryString from 'query-string'
import toJS from '~/to-js'

class SignOut extends Component {
  componentDidMount() {
    const qs = queryString.parse(window.location.search)
    this.props.getSignOutContext(qs.logoutId)
  }

  render() {
    const { isLoading, error, data } = this.props

    if (isLoading) {
      return (
        <div>
          <p>Signing out...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div>
          <p>There was an error signing out.</p>
        </div>
      )
    }

    if (data) {
      if (data.showSignOutPrompt) {
        return <SignOutForm />
      }

      this.props.navigateTo()
      return <div />
    }

    return <div />
  }
}

SignOut.propTypes = {
  getSignOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.get('signOutContext').get('isLoading'),
  error: state.get('signOutContext').get('error'),
  data: state.get('signOutContext').get('data'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSignOutContext }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SignOut))
