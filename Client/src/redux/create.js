import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import { createLogger } from 'redux-logger'
import { Iterable, Map } from 'immutable'
import reducer from './modules/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import routes from '~/routes'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const isDevelopment = process.env.NODE_ENV !== 'production'
const developmentMiddleware = []

if (isDevelopment) {
  developmentMiddleware.push(
    createLogger({
      stateTransformer: state =>
        Iterable.isIterable(state) ? state.toJS() : state,
    })
  )
}

export default function configureStore(initialState = new Map()) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(createHistory()),
        reduxPackMiddleware,
        thunkMiddleware,
        ...developmentMiddleware
      )
    )
  )

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      const reducer = require('./modules/reducer').default
      store.replaceReducer(reducer)
    })
  }

  return store
}
