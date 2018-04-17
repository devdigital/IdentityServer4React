import React from 'react'
import Home from './home/Home'
import SignedIn from './authentication/SignedIn'
import SignedOut from './authentication/SignedOut'
import Error from './chrome/Error'
import NotFound from './chrome/NotFound'

const routes = [
  {
    name: 'home',
    path: '/',
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
  {
    name: 'not-found',
    path: '/not-found',
    component: NotFound,
  },
]

export default routes
