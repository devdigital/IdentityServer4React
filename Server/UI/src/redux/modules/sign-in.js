import { handleActions } from 'redux-actions'
import { handle } from 'redux-pack'
import { fromJS } from 'immutable'
import signInService from '~/services/sign-in-service'

const SIGN_IN_START = 'identity/sign-in/START'

const initialState = fromJS({
  isLoading: false,
  signIn: null,
  error: null,
})

const reducer = handleActions(
  {
    [SIGN_IN_START]: (state, action) =>
      handle(state, action, {
        start: state =>
          state
            .set('isLoading', true)
            .set('signIn', initialState.get('signIn'))
            .set('error', initialState.get('error')),
        finish: state => state.set('isLoading', false),
        success: state =>
          state
            .set('signIn', fromJS(action.payload))
            .set('error', initialState.get('error')),
        failure: state =>
          state
            .set('signIn', initialState.get('signIn'))
            .set('error', fromJS(action.payload)),
      }),
  },
  initialState
)

export default reducer

export const signIn = (username, password, rememberMe, redirectUri) => ({
  type: SIGN_IN_START,
  promise: signInService.signIn(username, password, rememberMe, redirectUri),
})