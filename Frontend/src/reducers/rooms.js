import moment from 'moment';
import { Map, List } from 'immutable';

import {
  JOIN_ROOM,
  LEAVE_ROOM,
  FOCUS_ROOM,
  RECEIVE_MESSAGE,
} from '../actions/rooms';

const initial = {
  currentRoom: null,
  rooms: Map(),
};

export default function rooms(state = initial, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        ...state,
        currentRoom: action.room,
        rooms: state.rooms.set(action.room, Map({
          channel: action.channel,
          messages: List(),
        })),
      };

    case LEAVE_ROOM:
      return {
        ...state,

        currentRoom:
          state.currentRoom === action.room
          ? state.rooms.keySeq().get(0, null)
          : state.currentRoom,

        rooms: state.rooms.remove(action.room),
      };

    case FOCUS_ROOM:
      if (!state.rooms.has(action.room)) {
        return state;
      }

      return { ...state, currentRoom: action.room };

    case RECEIVE_MESSAGE:
      const message = Object.assign({}, action.message, {
        timestamp: moment(action.message.timestamp),
      })

      return {
        ...state,

        rooms: state.rooms.updateIn([action.room, 'messages'],
          messages => messages.push(message)),
      };
  }

  return initial;
}
