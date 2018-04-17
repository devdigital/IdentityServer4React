import apiService from './api-service'

class SignInService {
  signIn(username, password, rememberLogin, returnUrl) {
    return apiService.post('/api/authenticate', {
      username,
      password,
      rememberLogin,
      returnUrl,
    })
  }
}

export default new SignInService()
