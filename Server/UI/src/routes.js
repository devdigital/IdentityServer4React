import React from 'react'
import Error from './error/Error'
import SignIn from './authentication/SignIn'
import SignOut from './authentication/SignOut'

const routes = [
  {
    path: '/home/error',
    component: Error,
  },
  {
    path: '/account/login',
    component: SignIn,
  },
  {
    path: '/account/logout',
    component: SignOut,
  },
]

export default routes
