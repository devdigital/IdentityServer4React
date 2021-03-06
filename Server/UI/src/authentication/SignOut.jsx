import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from '~/redux/modules/sign-out'
import { checkSignOutContext } from '~/redux/modules/sign-out-context'
import queryString from 'query-string'
import toJS from '~/to-js'
import { withRouter } from 'react-router-dom'
import SignOutForm from './SignOutForm'

class SignOut extends Component {
  signOut = form => {
    const qs = queryString.parse(window.location.search)
    this.props.signOut(qs.logoutId)
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search)
    this.props.checkSignOutContext(qs.logoutId)
  }

  render() {
    const { signOutContext, signOutDetails } = this.props

    if (signOutContext.isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (signOutDetails.isLoading) {
      return (
        <div>
          <p>Signing out...</p>
        </div>
      )
    }

    if (signOutContext.error || signOutDetails.error) {
      return (
        <div>
          <p>There was an error signing out.</p>
        </div>
      )
    }

    if (signOutDetails.data) {
      return <div />
    }

    if (signOutContext.data) {
      if (signOutContext.data.signOutPrompt) {
        return <SignOutForm onSubmit={this.signOut} />
      }

      const logoutId = signOutContext.data.signOutId
      this.props.history.push({
        pathname: '/account/logged-out',
        search: logoutId ? `?logoutId=${logoutId}` : null,
      })

      return <div />
    }

    return <div />
  }
}

SignOut.propTypes = {
  checkSignOutContext: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  signOutContext: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    data: PropTypes.object,
  }),
  signOutDetails: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    data: PropTypes.object,
  }),
}

const mapStateToProps = state => ({
  signOutContext: state.get('signOutContext'),
  signOutDetails: state.get('signOut'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkSignOutContext, signOut }, dispatch)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(toJS(SignOut))
)
