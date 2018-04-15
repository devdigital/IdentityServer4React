import oidc from 'oidc-client'

const enableOidcLogging = () => {
  oidc.Log.logger = {
    debug: (message, ...args) => console.log(message, ...args),
    info: (message, ...args) => console.log(message, ...args),
    warn: (message, ...args) => console.warn(message, ...args),
    error: (message, ...args) => console.error(message, ...args),
  }

  oidc.Log.level = oidc.Log.DEBUG
}

export default enableOidcLogging
