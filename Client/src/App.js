import React from 'react'
import { Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import userManager from './authentication/user-manager'
import { Router, Route } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import createStore from '~/redux/create'
import createHistory from 'history/createBrowserHistory'
import oidc from 'oidc-client'

oidc.Log.logger = {
  debug: message => console.log(message),
  info: message => console.log(message),
  warn: message => console.warn(message),
  error: message => console.error(message),
}

oidc.Log.level = oidc.Log.DEBUG

const store = createStore()
const history = createHistory()

const Routes = () => (
  <div>
    {routes.map((r, i) => (
      <Route
        key={`route-${i}`}
        path={r.path}
        exact={r.exact}
        render={props => <r.component {...props} />}
      />
    ))}
  </div>
)

const App = () => {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <Router history={history}>
          <Routes />
        </Router>
      </OidcProvider>
    </Provider>
  )
}

export default App
