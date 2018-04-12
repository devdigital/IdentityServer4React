import React from 'react'
import Home from './home/Home'
import SignedIn from './authentication/SignedIn'
import SignedOut from './authentication/SignedOut'
import Error from './error/Error'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/signed-in',
    component: SignedIn,
  },
  {
    path: '/signed-out',
    component: SignedOut,
  },
  {
    path: '/error',
    component: Error,
  },
]

export default routes
