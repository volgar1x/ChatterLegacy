import React from 'react';

import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';

class App extends React.Component {
  render() {
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

export default App;
