import userManager from '~/authentication/user-manager'

class AuthenticationService {
  signIn() {
    return userManager.signinRedirect()
  }

  signOut() {
    return userManager.signoutRedirect()
  }
}

export default new AuthenticationService()
