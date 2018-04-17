import { router5Reducer } from 'redux-router5'
import { reducer as oidcReducer } from 'redux-oidc'
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  router: router5Reducer,
  oidc: oidcReducer,
})
