import React from 'react';
import { connect } from 'react-redux';

import * as RoomActions from '../actions/rooms';

import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';
import Loading from '../components/Loading';

class App extends React.Component {
  render() {
    if (!this.props.ready) {
      return <Loading fullScreen label="Connecting to room"/>;
    }

    return (
      <div style={styles.container}>
        <div style={styles.messages}>
          <Messages/>
        </div>
        <div style={styles.input}>
          <MessageInput/>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.props.connected && !this.props.ready) {
      this.props.startJoiningRoom('lobby');
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
  input: {
    borderTop: '1px solid black',
  },
  messages: {
    flex: 1,
    overflow: 'scroll',
  },
};

function mapStateToProps({ connection: { connected }, rooms: { currentRoom, rooms } }) {
  return {
    connected,
    ready: rooms.has(currentRoom),
  };
}

export default connect(mapStateToProps, RoomActions)(App);
