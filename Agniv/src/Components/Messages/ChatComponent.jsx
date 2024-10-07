import React, { useState, useRef, useEffect } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const eventSourceRef = useRef(null);

  const setupSSE = (currentQuery) => {
    const token = localStorage.getItem("Bearer_Token");
    const userId = localStorage.getItem("id");
    const streamUrl = `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/stream/query?query=${encodeURIComponent(currentQuery)}&userId=${userId}`;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = new EventSource(streamUrl, {
      withCredentials: true,
    });

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleStreamedResponse(data);
    };

    eventSourceRef.current.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSourceRef.current.close();
    };
  };

  const handleStreamedResponse = (streamData) => {
    const { content } = streamData;
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastMessage = updatedMessages[updatedMessages.length - 1];
      if (lastMessage && lastMessage.role === 'bot') {
        lastMessage.content += content;
      } else {
        updatedMessages.push({ role: 'bot', content });
      }
      return updatedMessages;
    });
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = (query) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: query }]);
    setupSSE(query);
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.role === 'user' ? 'You' : 'bot'}:</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatComponent;