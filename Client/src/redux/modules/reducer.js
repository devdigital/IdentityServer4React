import { routerReducer } from 'react-router-redux'
import { reducer as oidcReducer } from 'redux-oidc'
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  routing: routerReducer,
  oidc: oidcReducer,
})
