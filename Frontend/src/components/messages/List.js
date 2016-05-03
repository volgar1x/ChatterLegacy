import React from 'react';
import { connect } from 'react-redux';

import MessageItem from './MessageItem';
import EventItem from './EventItem';

class List extends React.Component {
  componentDidMount() {
    const timerid = window.setInterval(() => this.forceUpdate(), 60000);
    this.setState({timerid});
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timerid);
  }

  render() {
    return (
      <ul ref="feed" style={styles.feed}>
        {this.props.feed.map(this.renderItem)}
      </ul>
    );
  }

  renderItem = (item, key) => {
    let Item = itemComponents[item.type];
    let child;
    if (typeof Item !== 'undefined') {
      child = <Item {...item}/>
    } else {
      child = <em>unknown feed item {item.item}</em>;
    }

    return <li key={key} style={styles.item}>{child}</li>;
  };

  componentDidUpdate() {
    this.refs.feed.scrollIntoView(false);
  }
}

const itemComponents = {
  'message': MessageItem,
  'event': EventItem,
};

const styles = {
  feed: {
    margin: 0,
    padding: '0.5em',
    listStyle: 'none',
  },
  item: {
    marginBottom: '0.5em',
  },
};

export default List;
