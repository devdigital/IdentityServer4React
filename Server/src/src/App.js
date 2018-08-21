import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import routes from './routes'
import createStore from '~/redux/create'
import history from './history'

const store = createStore()

const Routes = () => (
  <div>
    {routes.map((r, i) => (
      <Route
        key={`route-${i}`}
        path={r.path}
        render={props => <r.component {...props} />}
      />
    ))}
  </div>
)

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  )
}

export default App
