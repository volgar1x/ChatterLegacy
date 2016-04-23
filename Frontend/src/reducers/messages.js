import { RECEIVE_MESSAGE } from '../actions/messages';

function messages(state = [], action) {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return [...state, action.message];
  }

  return state;
}

export default messages;
