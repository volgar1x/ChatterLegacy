import App from './containers/App';

import ConnectForm from './components/ConnectForm';
import Home from './components/Home';
import Room from './components/Room';

export default function getRoutes(store) {
  return {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
      {// un-authenticated
        onEnter(nextState, replace) {
          const {app: {rooms, connection: {connected}}} = store.getState();

          if (connected) {
            let room;
            if (rooms.length) {
              room = rooms.keySeq().first();
            } else {
              room = 'lobby';
            }
            replace(`/rooms/${room}`);
          }
        },
        childRoutes: [
          { path: 'sign-in/:room', component: ConnectForm },
          { path: 'sign-in', component: ConnectForm },
        ],
      },
      {// authenticated
        onEnter(nextState, replace) {
          const {app: {connection: {connected}}} = store.getState();

          if (!connected) {
            if (nextState.params.room) {
              replace(`/sign-in/${nextState.params.room}`)
            } else {
              replace('/sign-in');
            }
          }
        },
        childRoutes: [
          { path: 'rooms/:room', component: Room },
        ],
      },
    ],
  };
}
