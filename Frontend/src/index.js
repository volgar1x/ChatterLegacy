import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import App from './containers/App';

let app = document.createElement('div');
document.body.appendChild(app);
render(<App/>, app);
