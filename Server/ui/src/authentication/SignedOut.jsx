import React, { Component } from 'react'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkSignedOutContext } from '~/redux/modules/signed-out-context'
import toJS from '~/to-js'

const ClientRedirect = ({ name, uri }) => (
  <p>
    Return to <a href={uri}>{name}</a>.
  </p>
)

class SignedOut extends Component {
  componentDidMount() {
    const qs = queryString.parse(window.location.search)
    this.props.checkSignedOutContext(qs.logoutId)
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.props.error) {
      return (
        <div>
          <p>There was an error.</p>
        </div>
      )
    }

    if (!this.props.data) {
      return <div />
    }

    const { data } = this.props

    const clientName = data.clientName || 'client'
    const redirectToClient = data.postLogoutRedirectUri ? (
      <ClientRedirect uri={data.postLogoutRedirectUri} name={clientName} />
    ) : null

    return (
      <div>
        <p>You are signed out.</p>
        {redirectToClient}
      </div>
    )
  }
}

SignedOut.propTypes = {
  checkSignedOutContext: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  error: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.get('signedOutContext').get('isLoading'),
  data: state.get('signedOutContext').get('data'),
  error: state.get('signedOutContext').get('error'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkSignedOutContext }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SignedOut))
