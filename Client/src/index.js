import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createRouter from './create-router'
import createStore from '~/redux/create'
import enableOidcLogging from './oidc-logging'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import { OidcProvider } from 'redux-oidc'
import userManager from './authentication/user-manager'

enableOidcLogging()

const router = createRouter()
const store = createStore(router)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </OidcProvider>
    </Provider>,
    document.getElementById('root')
  )
}

router.start(() => render())
