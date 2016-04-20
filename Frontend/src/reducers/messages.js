import { List } from 'immutable';
import { ADD_MESSAGE } from '../actions/messages';
import moment from 'moment';

function messages(state = List(), action) {
  switch (action.type) {
    case ADD_MESSAGE:
      const timestamp = moment();
      return state.push({...action.message, timestamp});
  }

  return state;
}

export default messages;
