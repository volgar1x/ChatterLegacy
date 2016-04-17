import React from 'react';

import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';

class App extends React.Component {
  render() {
    return (
      <div>
        <MessageInput/>
        <Messages/>
      </div>
    );
  }
}

export default App;
