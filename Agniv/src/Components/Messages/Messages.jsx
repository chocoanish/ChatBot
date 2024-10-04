import React from 'react';

const Messages = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          {message.content}
        </div>
      ))}
      </>
  );
};

export default Messages;