import apiService from './api-service'

class AuthenticationService {
  signIn(username, password, rememberLogin, returnUrl) {
    return apiService.post('/api/sign-in', {
      username,
      password,
      rememberLogin,
      returnUrl,
    })
  }

  getSignOutContext(signOutId) {
    return apiService.get(`/api/sign-outs/${signOutId}/context`)
  }
}

export default new AuthenticationService()
