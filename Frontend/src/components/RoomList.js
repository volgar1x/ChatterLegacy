import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as RoomActions from '../actions/rooms';

import Modal from './Modal';

class JoinModal extends React.Component {
  static propTypes = {
    showing: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired,
  };

  state = {
    room: '',
  };

  componentWillReceiveProps(props) {
    if (!props.showing) {
      this.setState({ room: '' });
    }
  }

  render() {
    return (
      <Modal showing={this.props.showing} onClose={this.onClose}>
        <form onSubmit={this.onSubmit} style={styles.modal.form}>
          <label htmlFor="room">Room</label>
          <input type="text" required
                 id="room" ref="input"
                 value={this.state.room}
                 onChange={this.onChange}/>

          <button type="submit">Join</button>
        </form>
      </Modal>
    );
  }

  componentDidUpdate() {
    if (this.props.showing) {
      findDOMNode(this.refs.input).focus();      
    }
  }

  onChange = (e) => {
    this.setState({ room: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.room);

    return false;
  };

  onClose = () => {
    this.props.onSubmit(undefined);
  };
}

class Room extends React.Component {
  render() {
    const style = Object.assign({},
      styles.room,
      this.props.isCurrent ? styles.currentRoom : {});

    const leaveButton = !this.props.label && <a href="#" onClick={this.onLeave} style={styles.leaveRoom}>x</a>;

    return (
      <a href="#" style={style} onClick={this.onClick}>
        {this.props.label || this.props.room}
        {leaveButton}
      </a>
    );
  }

  onClick = (e) => {
    e.preventDefault();

    this.props.onClick(this.props.room);

    return false;
  };

  onLeave = (e) => {
    e.preventDefault();

    if (!this.props.isCurrent) {
      this.props.onLeave(this.props.room);
    }

    return false;
  };
}

class RoomList extends React.Component {
  state = {
    joinRequested: false,
  };

  render() {
    return (
      <div style={styles.container}>
        {this.props.rooms.map(this.renderRoom)}

        <Room label="+" onClick={this.onStartJoining}/>

        <JoinModal showing={this.state.joinRequested} onSubmit={this.onJoin}/>
      </div>
    );
  }

  renderRoom = (room, key) => {
    return <Room key={key} room={room}
                 onClick={this.onFocus}
                 onLeave={this.onLeave}
                 isCurrent={room == this.props.currentRoom}/>;
  };

  onFocus = (room) => {
    this.props.focusRoom(room);
  };

  onStartJoining = () => {
    this.setState({joinRequested: true});
  };

  onJoin = (room) => {
    this.setState({joinRequested: false});
    if (typeof room !== 'undefined') {
      this.props.startJoiningRoom(room);
    }
  };

  onLeave = (room) => {
    this.props.startLeavingRoom(room);
  };
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '6px',
  },
  room: {
    padding: '0.3em',
    background: 'silver',
    borderRadius: '2px',
    marginRight: '0.3em',
    color: 'black',
    textDecoration: 'none',
  },
  currentRoom: {
    background: '#85e0ff',
  },
  leaveRoom: {
    marginLeft: '0.4em',
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  modal: {
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      padding: '2em',
    },
  },
};

function mapStateToProps({ rooms: { currentRoom, rooms } }) {
  return {
    currentRoom,
    rooms: rooms.keySeq(),
  };
}

export default connect(mapStateToProps, RoomActions)(RoomList);
