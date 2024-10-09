import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import { ArrowUp } from "lucide-react";
import Logo from "../../assets/Logo.png";
import hamMenu from "../../assets/menu.svg";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {remark} from 'remark'

const Dashboard = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startConversation, setStartConversation] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const conversationsRef = useRef(null);
  const textareaRef = useRef(null);
const userId = localStorage.getItem("id");
const token = localStorage.getItem("Bearer_Token");
  const fn = localStorage.getItem("User_Data");
  const parsedData = JSON.parse(fn);
  const fname = parsedData.firstName;
  const lname = parsedData.lastName;
  const role = parsedData.role;
  const gender = parsedData.gender;

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setQuery(prevQuery => prevQuery + '\n');
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuery(e);
    }
  };

  const handleQuery = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    
    setStartConversation(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: query },
    ]);
    handleStreamResponse(query,userId,token);
    setQuery("");
    
    setIsAnimating(true);

  };



  const clearLocalStorage = () => {
    localStorage.clear();
  };


  const handleStreamResponse = async (query, userId, token) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/stream/query?query=${encodedQuery}&userId=${userId}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
      
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
      
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonData = JSON.parse(line.slice(5));
              setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
      
                // Check if the last message is from the assistant
                if (lastMessage.type === "assistant") {
                  const newContent = jsonData.content.trim();
                  const words = newContent.split(' ');
      
                  // Split and check for unique words not already in the message content
                  const lastMessageWords = lastMessage.content.split(' ');
                  const uniqueWords = words.filter(
                    (word) => !lastMessageWords.includes(word)
                  );
      
                  // Append only new, non-duplicate words
                  if (uniqueWords.length > 0) {
                    lastMessage.content += ' ' + uniqueWords.join(' ');
                  }
                } else {
                  newMessages.push({ type: "assistant", content: jsonData.content });
                }
      
                return newMessages;
              });
            } catch (error) {
              // Ignore parsing errors and continue
            }
          }
        }
      }
      
   } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "assistant", content: "An error occurred while fetching the response." }
      ]);
    } finally {
      setIsAnimating(false);
    }
  };
    useEffect(() => {
      if (conversationsRef.current) {
        conversationsRef.current.scrollTo({
          top: conversationsRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);
  

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="ham-menu">
          <img src={hamMenu} alt="Menu" />
        </div>
        <Link to="/login" onClick={clearLocalStorage} className="logout">
          <LogOut />
        </Link>
      </div>
      <div className="chat_container">
        <div className="Chat_Nav">
          <img src={Logo} alt="Logo" />
          <div>
            <div>
              <div className="profile_name">
                {fname} {lname}
              </div>
              <div className="profile_role">{role}</div>
            </div>
            <div className="profile-circle">
              <img
                src={`https://avatar.iran.liara.run/public/${gender}`}
                alt="Avatar"
              />
            </div>
          </div>
        </div>
        <div className="conversations_box">
          <div
            className={`${
              startConversation ? "conversations" : "startConversation"
            }`}
            ref={conversationsRef}
          >
            <div className="chit_chat">Hi! {fname}</div>
            <div className="chit_chat" id="HELPUSER">
              How can I help you?
            </div>
            {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.content}
            </div>
          ))}
            {isAnimating && (
              <div className="loading-message">
                <div className="loading-content">
                  <div className="loading-text">Waiting for response</div>
                  <div className="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="Query_Box">
            <textarea 
              id="input_box"
              name="query"
              ref={textareaRef}
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your queries here"
              required
            />
            <button
              className={`circle ${isAnimating ? "animate" : ""}`}
              onClick={handleQuery}
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;