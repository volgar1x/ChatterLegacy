import React from 'react';
import { connect } from 'react-redux';

class Messages extends React.Component {
  componentDidMount() {
    const timerid = window.setInterval(() => this.forceUpdate(), 60000);
    this.setState({timerid});
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timerid);
  }

  render() {
    return (
      <ul ref="messages" style={styles.messages}>
        {this.props.messages.map(this.renderMessage.bind(this))}
      </ul>
    );
  }

  renderMessage(message, key) {
    const author = !!message.author
      ? <span style={styles.message.author}>{message.author}</span>
      : <span style={{...styles.message.author, ...styles.message.authorMe}}>me</span>;

    return (
      <li key={key} style={styles.message.container}>
        {author}
        <span style={styles.message.text}>{message.text}</span>
        <span style={styles.message.timestamp}>{message.timestamp.fromNow()}</span>
      </li>
    );
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
    container: {
      marginBottom: '0.5em',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    author: {
      width: '10%',
      textAlign: 'right',
      marginRight: '1%',
      color: '#4F6687',
      fontWeight: 'bold',
      fontSize: '1.3em',
    },
    authorMe: {
      color: '#208A1C',
    },
    text: {
      width: '79%',
      textAlign: 'left',
      fontFamily: 'Lora, serif',
    },
    timestamp: {
      width: '10%',
      textAlign: 'right',
      color: '#B0B0B0',
      fontFamily: 'sans-serif',
      fontWeight: 'lighter',
      fontSize: '0.9em',
    },
  },
};

function mapStateToProps({ messages }) {
  return { messages };
}

export default connect(mapStateToProps)(Messages);
