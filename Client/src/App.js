import React from 'react'
import { Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import userManager from './authentication/user-manager'
import { Router, Route } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import createStore from '~/redux/create'
import createHistory from 'history/createBrowserHistory'
import enableOidcLogging from './oidc-logging'

enableOidcLogging()

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
