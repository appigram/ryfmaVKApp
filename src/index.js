import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
// import { Route } from 'react-router'
// import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './RootReducer'
import registerServiceWorker from './sw'
// import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import VKConnect from '@vkontakte/vkui-connect'

VKConnect.send('VKWebAppInit', {})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// Service Worker For Cache
registerServiceWorker()
