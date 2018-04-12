import apiService from './api-service'

class SignInService {
  signIn(username, password, rememberMe, returnUri) {
    return apiService.post('/api/authenticate', {
      username,
      password,
      rememberMe,
      returnUri,
    })
  }
}

export default new SignInService()
