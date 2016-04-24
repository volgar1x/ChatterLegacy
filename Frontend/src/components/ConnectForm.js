import React from 'react';
import { connect } from 'react-redux';

import * as ConnectionActions from '../actions/connection';

class ConnectForm extends React.Component {
  state = {
    username: '',
    server: 'ws://localhost:4000/socket',
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.form}>

          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input type="text"
                   id="username"
                   value={this.state.username}
                   onChange={this.onChange}
                   style={styles.input}/>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="server" style={styles.label}>Server URL</label>
            <input type="text"
                   id="server"
                   value={this.state.server}
                   onChange={this.onChange}
                   style={styles.input}/>
          </div>

          <button onClick={this.onConnect} style={styles.button}>
            Connect
          </button>

        </div>
      </div>
    );
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onConnect = (e) => {
    this.props.connect(this.state.server, this.state.username);
  };
}

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    width: '500px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    width: '30%',
    padding: '0.4em',
    textAlign: 'right',
  },
  input: {
    width: '70%',
    padding: '0.4em',
  },
  button: {
    margin: 'auto',
  },
};

export default connect(null, ConnectionActions)(ConnectForm);
