import React from 'react';
import { connect } from 'react-redux';

class Messages extends React.Component {
  render() {
    return (
      <ul>
        {this.props.messages.map(this.renderMessage.bind(this))}
      </ul>
    );
  }

  renderMessage(message, key) {
    return <li key={key}>{message.text}</li>;
  }
}

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps)(Messages);
