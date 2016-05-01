import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './fonts/Lora-Regular.css';

import getRoutes from './routes';
import configureStore from './store/configureStore';

const store = configureStore(undefined, hashHistory);
const history = syncHistoryWithStore(hashHistory, store);
const routes = getRoutes(store);

const app = document.createElement('div');
document.body.appendChild(app);
document.body.style.margin = 0;

render(
  <Provider store={store}>
    <Router routes={routes} history={hashHistory}/>
  </Provider>,
  app
);
