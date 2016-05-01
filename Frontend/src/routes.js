import App from './containers/App';

import ConnectForm from './components/ConnectForm';
import Home from './components/Home';
import Room from './components/Room';

export default {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    {// un-authenticated
      // onEnter(nextState, replace, cb) {
      //   console.log(arguments);
      // },
      childRoutes: [
        { path: 'sign-in', component: ConnectForm },
      ],
    },
    {// authenticated
      // onEnter(nextState, replace, cb) {
      //   console.log(arguments);
      // },
      childRoutes: [
        { path: 'rooms/:name', component: Room },
      ],
    },
  ],
};
