import React from 'react';
import { connect } from 'react-redux';

import * as ConnectionActions from '../actions/connection';

class ConnectForm extends React.Component {
  constructor(props) {
    super(props);

    if (window.localStorage && window.localStorage['ConnectForm']) {
      this.state = JSON.parse(window.localStorage['ConnectForm']);
    } else {
      this.state = {
        username: '',
        server: 'localhost:4000',
      };
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={this.onSubmit}>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input type="email" required
                   id="email"
                   value={this.state.email}
                   onChange={this.onChange}
                   style={styles.input}/>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input type="password" required
                   id="password"
                   value={this.state.password}
                   onChange={this.onChange}
                   style={styles.input}/>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="server" style={styles.label}>Server URL</label>
            <input type="text" required
                   id="server"
                   value={this.state.server}
                   onChange={this.onChange}
                   style={styles.input}/>
          </div>

          <button type="submit" style={styles.button}>
            Connect
          </button>

        </form>
      </div>
    );
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (window.localStorage) {
      window.localStorage['ConnectForm'] = JSON.stringify(this.state);
    }

    this.props.connect(
      `ws://${this.state.server}/socket`,
      this.state.email,
      this.state.password
    );

    return false;
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
