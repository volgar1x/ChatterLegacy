import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  CONNECTION_ERROR,
} from '../actions/connection';

const initial = {
  connecting: false,
  connected: false,
  username: null,
  socket: null,
  lastError: null,
};

export default function socket(state = initial, action) {
  switch (action.type) {
    case CONNECTING:
      return {...initial, connecting: true};

    case CONNECTED:
      return {...initial, connected: true, socket: action.socket, username: action.username};

    case DISCONNECTED:
      return initial;

    case CONNECTION_ERROR:
      return {...initial, lastError: action.event};
  }

  return state;
}
