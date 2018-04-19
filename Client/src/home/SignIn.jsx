import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { signIn } from '~/redux/modules/sign-in'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toJS from '~/redux/to-js'
import Loader from '~/chrome/Loader'
import Error from '~/chrome/Error'

class SignIn extends Component {
  signIn = event => {
    event.preventDefault()
    this.props.signIn()
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />
    }

    if (this.props.error) {
      return <Error />
    }

    if (this.props.data) {
      return <div />
    }

    return (
      <div>
        <button onClick={this.signIn}>Sign in</button>
      </div>
    )
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  error: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.get('signIn').get('isLoading'),
  data: state.get('signIn').get('data'),
  error: state.get('signIn').get('error'),
})

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SignIn))
