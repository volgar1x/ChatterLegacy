import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './fonts/Lora-Regular.css';

import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

const app = document.createElement('div');
document.body.appendChild(app);
document.body.style.margin = 0;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);


import * as ConnectionActions from './actions/connection';
store.dispatch(ConnectionActions.connect('ws://localhost:4000/socket', ''));
