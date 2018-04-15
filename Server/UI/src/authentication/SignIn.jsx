import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignInForm from './SignInForm'
import { signIn } from '~/redux/modules/sign-in'
import queryString from 'query-string'
import toJS from '~/to-js'

class SignIn extends Component {
  signIn = form => {
    const qs = queryString.parse(window.location.search)
    this.props.signIn(form.username, form.password, true, qs.returnUrl)
  }

  render() {
    const { isLoading, error, data } = this.props

    if (isLoading) {
      return (
        <div>
          <p>Signing in...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div>
          <p>There was an error signing in.</p>
        </div>
      )
    }

    if (data) {
      window.location.href = encodeURIComponent(data.uri)
      return <div />
    }

    return (
      <div>
        <h2>Sign In</h2>
        <SignInForm onSubmit={this.signIn} />
      </div>
    )
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.get('signIn').get('isLoading'),
  error: state.get('signIn').get('error'),
  data: state.get('signIn').get('data'),
})

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SignIn))
