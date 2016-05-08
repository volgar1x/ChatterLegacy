import React from 'react';

class UserList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.users.map((user, key) =>
          <li key={key}>{user.username}</li>)}
      </ul>
    );
  }
}

export default UserList;
