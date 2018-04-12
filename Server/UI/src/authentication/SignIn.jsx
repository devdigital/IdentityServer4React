import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignInForm from './SignInForm'
import { signIn } from '~/redux/modules/sign-in'

class SignIn extends Component {
  signIn = form => {
    this.props.signIn(
      form.username,
      form.password,
      true,
      'http://localhost:8080/signed-in'
    )
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

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch)

export default connect(null, mapDispatchToProps)(SignIn)
