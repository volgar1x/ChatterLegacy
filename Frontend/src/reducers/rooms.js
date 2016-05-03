import moment from 'moment';
import { Map, List } from 'immutable';

import {
  JOIN_ROOM,
  LEAVE_ROOM,
  FOCUS_ROOM,
  RECEIVE,
  RECEIVE_MANY,
} from '../actions/rooms';

const initial = Map();

function sanitizePayload({ timestamp, ...payload }) {
  return { ...payload, timestamp: moment(timestamp) };
}

export default function rooms(state = initial, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return state.set(action.room, Map({
        channel: action.channel,
        feed: List(),
      }));

    case LEAVE_ROOM:
      return state.remove(action.room);

    case RECEIVE:
      return state.updateIn([action.room, 'feed'],
        feed => feed.push(sanitizePayload(action.payload)));

    case RECEIVE_MANY:
      return state.updateIn([action.room, 'feed'],
        feed => action.payloads.reduce(
          (acc, x) => acc.push(sanitizePayload(x)),
          feed));
  }

  return state;
}
