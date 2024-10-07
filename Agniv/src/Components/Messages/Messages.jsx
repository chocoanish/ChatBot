import React, { useState } from "react";
import TypingEffect from "../../hooks/useTypingEffect";

const Message = ({ message }) => {
  const [isTyping, setIsTyping] = useState(message.type === 'user');
  
  if (message.type === 'user') {
    return (
      <div className={`message ${message.type}`}>
        {isTyping ? (
          <TypingEffect 
            content={message.content} 
            onComplete={() => setIsTyping(false)}
          />
        ) : (
          message.content
        )}
      </div>
    );
  } else {
    return (
      <div className={`message ${message.type}`}>
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
    );
  }
};

const Messages = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Message
          key={message.id || index}
          message={message}
        />
      ))}
    </>
  );
};

export default Messages;