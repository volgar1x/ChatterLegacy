import { combineReducers } from 'redux';

import connection from './connection';
import rooms from './rooms';

const rootReducer = combineReducers({
  connection,
  rooms,
});

export default rootReducer;
