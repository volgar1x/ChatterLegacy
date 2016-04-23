import {channel} from '../store/websocket';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}

export function sendMessage(message) {
    channel('rooms:lobby')
    .then(channel => {
        channel.push('shout', message);
    });
}
