import { createUserManager } from 'redux-oidc'

const userManagerConfig = {
  authority: 'http://localhost:5000',
  client_id: 'react-client',
  redirect_uri: 'http://localhost:8080/signed-in',
  post_logout_redirect_uri: 'http://localhost:8080',
  response_type: 'token id_token',
  scope: 'openid profile',
  loadUserInfo: true,
  monitorSession: false,
}

const userManager = createUserManager(userManagerConfig)

export default userManager
