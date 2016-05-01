import { replace } from 'react-router-redux';

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const FOCUS_ROOM = 'FOCUS_ROOM';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

export function joinRoom(room, channel) {
  return { type: JOIN_ROOM, room, channel };
}

export function leaveRoom(room) {
  return { type: LEAVE_ROOM, room };
}

export function focusRoom(room) {
  return replace(`/rooms/${room}`);
}

export function receiveMessage(room, message) {
  return { type: RECEIVE_MESSAGE, room, message };
}

export function receiveEvent(room, event) {
  return { type: RECEIVE_EVENT, room, event };
}

export function startJoiningRoom(room) {
  return (dispatch, getState) => {
    const {app: {connection: {socket}}} = getState();

    const channel = socket.channel(`rooms:${room}`);
    channel.onClose(() => dispatch(leaveRoom(room)));
    channel.join().receive('ok', () => {
      dispatch(joinRoom(room, channel));
      dispatch(focusRoom(room));

      channel.on('sync', ({past_logs}) => {
        for (const past_log of past_logs) {
          switch (past_log.type) {
            case 'event':
              dispatch(receiveEvent(room, past_log.payload));
              break;
            case 'shout':
              dispatch(receiveMessage(room, past_log.payload));
              break;
          }
        }
      });
      channel.on('event', event => dispatch(receiveEvent(room, event)));
      channel.on('shout', message => dispatch(receiveMessage(room, message)));
    });
  };
}

export function startLeavingRoom(room) {
  return (dispatch, getState) => {
    const {app: {rooms}} = getState();

    const channel = rooms.getIn([room, 'channel']);
    channel.leave();
  };
}

export function startSendingMessage(message) {
  return (dispatch, getState) => {
    const {app: {rooms}, routing: {locationBeforeTransitions: {pathname}}} = getState();

    if (pathname.indexOf('/rooms/') < 0) {
      return;
    }
    const currentRoom = pathname.substring('/rooms/'.length);

    const channel = rooms.getIn([currentRoom, 'channel']);
    channel.push('shout', message);
  };
}
