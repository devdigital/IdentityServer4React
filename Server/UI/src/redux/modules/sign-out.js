import { handleActions } from 'redux-actions'
import { handle } from 'redux-pack'
import { fromJS } from 'immutable'
import authenticationService from '~/services/authentication-service'
import history from '~/history'

const SIGN_OUT_START = 'identity/sign-out/START'

const initialState = fromJS({
  isLoading: false,
  data: null,
  error: null,
})

const reducer = handleActions(
  {
    [SIGN_OUT_START]: (state, action) =>
      handle(state, action, {
        start: state =>
          state
            .set('isLoading', true)
            .set('data', initialState.get('data'))
            .set('error', initialState.get('error')),
        finish: state => state.set('isLoading', false),
        success: state =>
          state
            .set('data', fromJS(action.payload.data))
            .set('error', initialState.get('error')),
        failure: state =>
          state
            .set('data', initialState.get('data'))
            .set('error', fromJS(action.payload)),
      }),
  },
  initialState
)

export default reducer

const signOutImpl = async signOutId => {
  const context = await authenticationService.signOut(signOutId)

  const logoutId = context.data.signOutId
  history.push({
    pathname: '/account/logged-out',
    search: logoutId ? `?logoutId=${logoutId}` : null,
  })

  return context
}

export const signOut = signOutId => ({
  type: SIGN_OUT_START,
  promise: signOutImpl(signOutId),
})
