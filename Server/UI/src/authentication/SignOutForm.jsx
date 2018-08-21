import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

let SignOutForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <p>Are you sure you want to sign out?</p>
      <button type="submit">Sign Out</button>
    </form>
  )
}

SignOutForm = reduxForm({
  form: 'sign-out',
})(SignOutForm)

export default SignOutForm
