import { createUserManager } from 'redux-oidc'

const userManagerConfig = {
  client_id: 'react-client',
  redirect_uri: 'http://localhost:8080/signed-in',
  response_type: 'token id_token',
  scope: 'openid profile',
  authority: 'http://localhost:5000',
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
}

const userManager = createUserManager(userManagerConfig)

export default userManager
