import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link, routerShape } from 'react-router';

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
  static contextTypes = {
    router: routerShape,
  };

  static defaultProps = {
    onLeave() {},
  };

  render() {
    const {label, room, onLeave} = this.props;
    const {router} = this.context;

    const path = `/rooms/${room}`;

    const activeStyle =
      router && router.isActive(path)
      ? styles.currentRoom
      : {};

    return (
      <div style={styles.roomBtn}>
        <Link to={path} style={{...styles.room, ...styles.roomLeft, ...activeStyle}}>
          #{label || room}
        </Link>
        <a href="#" onClick={this.onLeave} style={{...styles.room, ...styles.roomRight, ...activeStyle}}>x</a>
      </div>
    );
  }

  onLeave = (e) => {
    e.preventDefault();
    this.props.onLeave(this.props.room);
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

        <a href="#" onClick={this.onStartJoining} style={styles.room}>+</a>

        <JoinModal showing={this.state.joinRequested} onSubmit={this.onJoin}/>
      </div>
    );
  }

  renderRoom = (room, key) => {
    return <Room key={key} room={room} onLeave={this.onLeave}/>;
  };

  onStartJoining = (e) => {
    e.preventDefault();
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
  roomBtn: {
    marginRight: '0.3em',
  },
  room: {
    padding: '0.3em',
    background: 'silver',
    color: 'black',
    textDecoration: 'none',
    float: 'left',
    borderRadius: '15px',
    // padding: '0 10px 0 10px',
  },
  roomLeft: {
    borderRadius: 0,
    borderTopLeftRadius: '15px',
    borderBottomLeftRadius: '15px',
    paddingLeft: '10px',
  },
  roomRight: {
    borderRadius: 0,
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
    paddingRight: '10px',
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

function mapStateToProps({ app: { rooms } }) {
  return {
    rooms: rooms.keySeq(),
  };
}

export default connect(mapStateToProps, RoomActions)(RoomList);
