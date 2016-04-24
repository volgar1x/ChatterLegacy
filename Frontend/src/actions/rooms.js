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
  return { type: FOCUS_ROOM, room };
}

export function receiveMessage(room, message) {
  return { type: RECEIVE_MESSAGE, room, message };
}

export function receiveEvent(room, event) {
  return { type: RECEIVE_EVENT, room, event };
}

export function startJoiningRoom(room) {
  return (dispatch, getState) => {
    const {connection: {socket}} = getState();

    const channel = socket.channel(`rooms:${room}`);
    channel.onClose(() => dispatch(leaveRoom(room)));
    channel.on('event', event => dispatch(receiveEvent(room, event)));
    channel.on('shout', message => dispatch(receiveMessage(room, message)));
    channel.join().receive('ok', () => dispatch(joinRoom(room, channel)));
  };
}

export function startLeavingRoom(room) {
  return (dispatch, getState) => {
    const {rooms: {rooms}} = getState();

    const channel = rooms.getIn([room, 'channel']);
    channel.leave();
  };
}

export function startSendingMessage(message) {
  return (dispatch, getState) => {
    const {rooms: {rooms, currentRoom}} = getState();

    const channel = rooms.getIn([currentRoom, 'channel']);
    channel.push('shout', message);
  };
}
