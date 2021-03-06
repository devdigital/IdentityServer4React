import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

let SignInForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <Field name="username" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <div>
        <label htmlFor="rememberMe">Remember Me?</label>
        <Field name="rememberMe" component="input" type="checkbox" />
      </div>
      <button type="submit">Sign In</button>
    </form>
  )
}

SignInForm = reduxForm({
  form: 'sign-in',
})(SignInForm)

export default SignInForm
