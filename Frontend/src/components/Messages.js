import React from 'react';
import { connect } from 'react-redux';

class Messages extends React.Component {
  render() {
    return (
      <ul ref="messages" style={styles.messages}>
        {this.props.messages.map(this.renderMessage.bind(this))}
      </ul>
    );
  }

  renderMessage(message, key) {
    return <li key={key} style={styles.message}>{message.text}</li>;
  }

  componentDidUpdate() {
    this.refs.messages.scrollIntoView(false);
  }
}

const styles = {
  messages: {
    margin: 0,
    padding: '0.5em',
    listStyle: 'none',
  },
  message: {
    marginBottom: '0.5em',
    fontSize: '1.3em',
  },
};

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps)(Messages);
