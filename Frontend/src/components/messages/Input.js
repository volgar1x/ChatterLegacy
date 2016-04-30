import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import * as RoomActions from '../../actions/rooms';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.startSendingMessage({text: this.state.text});
      this.setState({text: ''});
    }
  };

  render() {
    return <input type="text" ref="input"
                  value={this.state.text}
                  onChange={this.onChange}
                  onKeyPress={this.onKeyPress}
                  placeholder="Enter a message"
                  style={styles.input}/>;
  }

  focus() {
    findDOMNode(this.refs.input).focus();
  }
}

const styles = {
  input: {
    width: '100%',
    fontSize: '1em',
    padding: '0.8em',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
  },
};

export default connect(null, RoomActions)(Input);
