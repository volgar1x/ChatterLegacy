import React from 'react';

function MessageItem({author, text, timestamp}) {
  return (
    <div style={styles.container}>
      <span style={styles.author}>{author}</span>
      <span style={styles.text}>{text}</span>
      <span style={styles.timestamp}>{timestamp.fromNow()}</span>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    width: '10%',
    textAlign: 'right',
    marginRight: '1%',
    color: '#4F6687',
    fontWeight: 'bold',
    fontSize: '1.3em',
  },
  text: {
    width: '79%',
    textAlign: 'left',
    fontFamily: 'Lora, serif',
  },
  timestamp: {
    width: '10em',
    textAlign: 'right',
    color: '#B0B0B0',
    fontFamily: 'sans-serif',
    fontWeight: 'lighter',
    fontSize: '0.9em',
  },
};

export default MessageItem;
