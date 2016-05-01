import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Chatter</h1>
        <p>The most amazing chat app of the world!</p>
        <Link to="/sign-in">Sign in</Link>
      </div>
    );
  }
}

const styles = {

};

export default Home;
