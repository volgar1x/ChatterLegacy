import { replace } from 'react-router-redux';

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const FOCUS_ROOM = 'FOCUS_ROOM';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const RECEIVE_MANY = 'RECEIVE_MANY';

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

export function receiveMany(room, logs) {
  return { type: RECEIVE_MANY, room, logs };
}

export function startJoiningRoom(room) {
  return (dispatch, getState) => {
    const {app: {connection: {socket}, rooms}} = getState();

    const channel = socket.channel(`rooms:${room}`);
    channel.join().receive('ok', () => {
      dispatch(joinRoom(room, channel));
      dispatch(focusRoom(room));

      channel.on('sync', ({past_logs}) => dispatch(receiveMany(room, past_logs)));
      channel.on('event', event => dispatch(receiveEvent(room, event)));
      channel.on('shout', message => dispatch(receiveMessage(room, message)));
    });
  };
}

function getCurrentRoom({locationBeforeTransitions: {pathname}}) {
  if (pathname.indexOf('/rooms/') < 0) {
    return undefined;
  }
  return pathname.substring('/rooms/'.length);
}

export function startLeavingRoom(room) {
  return (dispatch, getState) => {
    const {app: {rooms}, routing} = getState();

    const currentRoom = getCurrentRoom(routing);

    const channel = rooms.getIn([room, 'channel']);
    channel.onClose(() => {
      dispatch(leaveRoom(room));

      if (currentRoom === room) {
        if (rooms.length > 1) {
          const nextRoom = rooms.keySeq().remove(currentRoom).first();
          dispatch(focusRoom(nextRoom));
        } else {
          dispatch(startJoiningRoom('lobby'));
        }
      }
    });
    channel.leave();
  };
}

export function startSendingMessage(message) {
  return (dispatch, getState) => {
    const {app: {rooms}, routing} = getState();

    const currentRoom = getCurrentRoom(routing);

    const channel = rooms.getIn([currentRoom, 'channel']);
    channel.push('shout', message);
  };
}
