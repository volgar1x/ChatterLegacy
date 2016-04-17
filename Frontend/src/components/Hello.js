/** @flow */

import React from 'react';

class Hello extends React.Component {
  props: {
    name: string,
  };

  static defaultProps = {
    name: "World",
  };

  render(): React.Element {
    return <div>Hello, {this.props.name}!</div>;
  }
}

export default Hello;
