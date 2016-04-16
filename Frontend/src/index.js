/** @flow */

import React from 'react';
import {render} from 'react-dom';

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

class App extends React.Component {
  state: {
    name: string,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "World",
    };
  }

  onChange(e) {
    this.setState({name: e.target.value});
  }

  render(): React.Element {
    return (
      <div>
        <Hello name={this.state.name}/>
        <input type="text" value={this.state.name} onChange={this.onChange.bind(this)}/>
      </div>
    );
  }
}

let app = document.createElement('div');
document.body.appendChild(app);
render(<App/>, app);
