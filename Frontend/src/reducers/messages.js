import { List } from 'immutable';
import { ADD_MESSAGE } from '../actions/messages';

function messages(state = List(), action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.push(action.message);
  }
  
  return state;
}

export default messages;
