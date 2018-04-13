import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignInForm from './SignInForm'
import { signIn } from '~/redux/modules/sign-in'
import queryString from 'query-string'

class SignIn extends Component {
  signIn = form => {
    const qs = queryString.parse(window.location.search)
    this.props.signIn(form.username, form.password, true, qs.returnUrl)
  }

  render() {
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
}

const mapStateToProps = state => ({
  routing: state.get('routing'),
})

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
