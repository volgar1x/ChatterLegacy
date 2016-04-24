import React from 'react';

class Loading extends React.Component {
  static defaultProps = {
    maxIncrement: 3,
    fullScreen: false,
    label: 'Loading',
    interval: 600,
  };

  constructor(props) {
    super(props);

    this.state = {
      increment: 0,
    };
  }

  render() {
    let style = {};
    if (this.props.fullScreen) {
      style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      };
    }

    return <div style={style}><h3>{this.props.label}{this.renderIncrements()}</h3></div>
  }

  renderIncrements() {
    return Array(this.state.increment + 1).join('.');
  }

  componentDidMount() {
    const timer = window.setInterval(() => {
      if (this.state.increment == 3) {
        this.setState({increment: 0});
      } else {
        this.setState({increment: this.state.increment + 1});
      }
    }, this.props.interval);

    this.setState({timer: timer});
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timer);
  }
}

export default Loading;
