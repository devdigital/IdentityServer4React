import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
})
