import moment from 'moment';
import { Map, List } from 'immutable';

import {
  JOIN_ROOM,
  LEAVE_ROOM,
  FOCUS_ROOM,
  RECEIVE_MESSAGE,
  RECEIVE_EVENT,
  RECEIVE_MANY,
} from '../actions/rooms';

const initial = Map();

export default function rooms(state = initial, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return state.set(action.room, Map({
        channel: action.channel,
        feed: List(),
      }));

    case LEAVE_ROOM:
      return state.remove(action.room);

    case RECEIVE_MESSAGE:
      const messageItem = {
        ...action.message,
        item: 'message',
        timestamp: moment(action.message.timestamp),
      };

      return state.updateIn([action.room, 'feed'],
          feed => feed.push(messageItem));

    case RECEIVE_EVENT:
      const eventItem = {
        ...action.event,
        item: 'event',
        timestamp: moment(action.event.timestamp),
      };

      return state.updateIn([action.room, 'feed'],
          feed => feed.push(eventItem));

    case RECEIVE_MANY:
      return state.updateIn([action.room, 'feed'],
        feed => action.logs.reduce((acc, x) => {
          let log;
          switch (x.type) {
            case 'event':
              log = {...x.payload, item: 'event'};
              break;
            case 'shout':
              log = {...x.payload, item: 'message'};
              break;
          }
          log.timestamp = moment(log.timestamp);
          return acc.push(log);
        }, feed));
  }

  return state;
}
