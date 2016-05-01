import React from 'react';
import { connect } from 'react-redux';

import * as RoomActions from '../actions/rooms';

import MessageInput from '../components/messages/Input';
import MessageList from '../components/messages/List';
import Loading from '../components/Loading';
import ConnectForm from '../components/ConnectForm';
import RoomList from '../components/RoomList';

class App extends React.Component {
  render() {
    const room = this.props.rooms.get(this.props.params.room);

    if (typeof room === 'undefined') {
      return <Loading fullScreen label="Connecting to room"/>;
    }

    const feed = room.get('feed');

    return (
      <div style={styles.container}>
        <div style={styles.rooms}>
          <RoomList/>
        </div>
        <div style={styles.messages}>
          <MessageList feed={feed}/>
        </div>
        <div style={styles.input}>
          <MessageInput/>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  input: {
    borderTop: '1px solid black',
  },
  messages: {
    flex: 1,
    overflow: 'scroll',
  },
};

function mapStateToProps({ app: { rooms } }) {
  return { rooms };
}

export default connect(mapStateToProps, RoomActions)(App);
