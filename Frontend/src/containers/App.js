/** @flow */

import React from 'react';
import Hello from '../components/Hello';

type Event = {
  target: HTMLInputElement,
};

class App extends React.Component {
  state: {
    name: string,
  };

  onChange: (e: Event) => void;

  constructor(props: any) {
    super(props);

    this.state = {
      name: "World",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e: Event) {
    this.setState({name: e.target.value});
  }

  render(): React.Element {
    return (
      <div>
        <Hello name={this.state.name}/>
        <input type="text" value={this.state.name} onChange={this.onChange}/>
      </div>
    );
  }
}

export default App;
