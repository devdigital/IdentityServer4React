import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form'
import signIn from './sign-in'
import signOutContext from './sign-out-context'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  signIn,
  signOutContext,
})
