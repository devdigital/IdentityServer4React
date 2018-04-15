import React from 'react'
import Home from './home/Home'
import SignedIn from './authentication/SignedIn'
import SignedOut from './authentication/SignedOut'
import Error from './error/Error'

const routes = [
  {
    name: 'home',
    path: '/dashboard',
    component: Home,
  },
  {
    name: 'signed-in',
    path: '/signed-in',
    component: SignedIn,
  },
  {
    name: 'signed-out',
    path: '/signed-out',
    component: SignedOut,
  },
  {
    name: 'error',
    path: '/error',
    component: Error,
  },
]

export default routes
