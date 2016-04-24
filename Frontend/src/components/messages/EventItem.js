import React from 'react';

export default function EventItem({text, timestamp}) {
  return <em>{text} {timestamp.fromNow()}</em>;
}
