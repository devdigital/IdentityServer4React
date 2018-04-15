import React, { createElement } from 'react'
import { connect } from 'react-redux'
import routes from './routes'
import NotFound from '~/chrome/NotFound'
import { routeNodeSelector } from 'redux-router5'

const App = ({ route }) => {
  console.log(route)
  const routeName = route ? route.name : null
  const matchingRoute = routeName ? routes.find(r => r.name == routeName) : null
  const component = matchingRoute ? matchingRoute.component : NotFound

  return createElement(component)
}

export default connect(state => routeNodeSelector(''))(App)
