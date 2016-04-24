import React from 'react';

class Modal extends React.Component {
  static propTypes = {
    showing: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired,
  };

  defaultProps = {
    showing: false,
    onClose: () => undefined,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onDocumentKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onDocumentKeydown, false);
  }

  render() {
    const style =
      Object.assign({},
        styles.container,
        this.props.showing ? styles.showing : styles.hidden);

    return (
      <div style={style}>
        <div style={styles.content}>{this.props.children}</div>
      </div>
    );
  }

  onDocumentKeydown = (e) => {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.props.onClose();
    }
  }
}

const styles = {
  container: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showing: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  content: {
    background: '#fefefe',
    maxWidth: '80vw',
  },
};

export default Modal;
