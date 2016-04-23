import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './fonts/Lora-Regular.css';

import App from './containers/App';
import configureStore from './store/configureStore';
import { channel } from './store/websocket';
import { receiveMessage } from './actions/messages';

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

channel('rooms:lobby')
.then(channel => {
    channel.on('shout', x => store.dispatch(receiveMessage(x)));
});
