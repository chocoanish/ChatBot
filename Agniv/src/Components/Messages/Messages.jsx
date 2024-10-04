import React, { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (currentIndex < content.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Adjust typing speed here (lower = faster)

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else {
      onComplete?.();
    }
  }, [currentIndex, content, onComplete]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return displayedContent;
};

const Message = ({ message, isLatest }) => {
  const [isTyping, setIsTyping] = useState(message.type === 'bot' && isLatest);
  const [showFullContent, setShowFullContent] = useState(message.type === 'user');

  return (
    <div className={`message ${message.type}`}>
      {!isTyping || showFullContent ? (
        message.content
      ) : (
        <TypingEffect 
          content={message.content} 
          onComplete={() => {
            setIsTyping(false);
            setShowFullContent(true);
          }}
        />
      )}
    </div>
  );
};

const Messages = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isLatest={index === messages.length - 1}
        />
      ))}
    </>
  );
};

export default Messages;