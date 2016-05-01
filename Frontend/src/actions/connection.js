import { Socket } from 'phoenix-socket';
import { startJoiningRoom } from './rooms';

export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const CONNECTION_ERROR = 'CONNECTION_ERROR';

export function connecting() {
  return {type: CONNECTING};
}

export function connected(socket) {
  return {type: CONNECTED, socket};
}

export function disconnected(event) {
  return {type: DISCONNECTED, event};
}

export function connectionError(event) {
  return {type: CONNECTION_ERROR, event};
}

export function connect(url, email, password) {
  return dispatch => {
    dispatch(connecting());

    let socket = new Socket(url, {params: {email, password}});

    socket.onOpen(() => {
      dispatch(connected(socket));
      dispatch(startJoiningRoom('lobby'));
    });

    socket.onClose((event) => {
      dispatch(disconnected(event));
    });

    socket.onError((event) => {
      dispatch(connectionError(event));
    });

    socket.connect();
  };
}
