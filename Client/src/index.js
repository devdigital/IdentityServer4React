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

// Object.defineProperty(window, 'localStorage', {
//   configurable: true,
//   enumerable: true,
//   value: new Proxy(localStorage, {
//     set: function(ls, prop, value) {
//       console.log(`direct assignment: ${prop} = ${value}`)
//       debugger
//       ls[prop] = value
//       return true
//     },
//     get: function(ls, prop) {
//       // The only property access we care about is setItem. We pass
//       // anything else back without complaint. But using the proxy
//       // fouls 'this', setting it to this {set: fn(), get: fn()}
//       // object.
//       if (prop !== 'setItem') {
//         if (typeof ls[prop] === 'function') {
//           return ls[prop].bind(ls)
//         } else {
//           return ls[prop]
//         }
//       }
//       console.log('setItem called')
//       debugger
//       return ls[prop].bind(ls)
//     },
//   }),
// })

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
