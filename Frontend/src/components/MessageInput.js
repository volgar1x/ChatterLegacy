import React from 'react';
import { connect } from 'react-redux';
import * as MessageActions from '../actions/messages';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      text: '',
    };
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.addMessage({text: this.state.text});
      this.setState({text: ''});
    }
  }

  render() {
    return <input type="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  onKeyPress={this.onKeyPress}
                  placeholder="Enter a message"
                  style={styles.input}/>;
  }
}

const styles = {
  input: {
    width: '100%',
    fontSize: '1em',
    padding: '0.5em',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
  },
};

export default connect(undefined, MessageActions)(MessageInput);
