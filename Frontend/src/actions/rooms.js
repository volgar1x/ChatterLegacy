import { replace } from 'react-router-redux';

import { fetchUser } from './users';

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const FOCUS_ROOM = 'FOCUS_ROOM';
export const RECEIVE = 'RECEIVE';
export const RECEIVE_MANY = 'RECEIVE_MANY';
export const USER_JOIN = 'USER_JOIN';
export const USER_LEAVE = 'USER_LEAVE';

export function joinRoom(room, channel) {
  return { type: JOIN_ROOM, room, channel };
}

export function leaveRoom(room) {
  return { type: LEAVE_ROOM, room };
}

export function focusRoom(room) {
  return replace(`/rooms/${room}`);
}

export function receive(room, payload) {
  return { type: RECEIVE, room, payload };
}

export function receiveMany(room, payloads) {
  return { type: RECEIVE_MANY, room, payloads };
}

export function userJoin(room, userId) {
  return dispatch => {
    fetchUser(userId)
    .then(user => dispatch({ type: USER_JOIN, room, user }));
  };
}

export function userLeave(room, userId) {
  return { type: USER_LEAVE, room, userId };
}

export function startJoiningRoom(room) {
  return (dispatch, getState) => {
    const {app: {connection: {socket}, rooms}} = getState();

    const channel = socket.channel(`rooms:${room}`);
    channel.join().receive('ok', () => {
      dispatch(joinRoom(room, channel));
      dispatch(focusRoom(room));

      channel.on('sync', ({payloads}) => dispatch(receiveMany(room, payloads)));
      channel.on('payload', payload => dispatch(receive(room, payload)));
      channel.on('who', ({user_id, entering}) => dispatch(entering ? userJoin(room, user_id) : userLeave(room, user_id)));
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
