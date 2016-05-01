import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import loggerMiddleware from 'redux-logger';

import reducers from '../reducers';

export default function configureStore(initialState, history) {
  const store = createStore(
    combineReducers({
      app: reducers,
      routing: routerReducer,
    }),
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        loggerMiddleware()),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
