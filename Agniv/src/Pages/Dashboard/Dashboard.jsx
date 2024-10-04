import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css'
import { ArrowUp } from "lucide-react";
import Logo from "../../assets/Logo.png";
import hamMenu from '../../assets/menu.svg'
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Messages from '../../Components/Messages/Messages';
import axios from 'axios'

// import React, { useState, useEffect, useRef } from 'react';
// //... (rest of the imports)

const Dashboard = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startConversation,setStartConversation] = useState(false);
  const [query, setQuery] = useState(""); 
  const [messages, setMessages] = useState([ 
    // { type: 'bot', content: "Hello! How can I assist you today?" },
    // { type: 'user', content: "I have a question about React." },
    // { type: 'bot', content: "Sure, I'd be happy to help with your React question. What would you like to know?" },
    // { type: 'user', content: "How do I manage state in functional components?" },
    // { type: 'bot', content: "In functional components, you can manage state using the useState hook. It allows you to add state to functional components without converting them to class components. Here's a basic example:\n\nconst [count, setCount] = useState(0);\n\nThis creates a state variable 'count' initialized to 0, and a function 'setCount' to update it." }
  ]);

  const conversationsRef = useRef(null); // reference to conversations div

  // Local Storage
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
    if (e.key === 'Enter') {
      handleQuery(e); // Trigger handleQuery on Enter key press
    }
  };


  const handleQuery = async (e) => {
    if(query != ""){
    e.preventDefault();
    setStartConversation(true);
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', content: query },
    ]);

    setIsAnimating(true);
    const encodedQuery = encodeURIComponent(query);
    const token = localStorage.getItem("Bearer_Token");
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(
        `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/chat/query?query=${encodedQuery}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAnimating(false);
      console.log(response.data.response)
      // Add new message to the messages array
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'bot', content: response.data.response }
      ]);
      
      
    } catch (error) {
      console.error(
        "Query error:",
        error.response ? error.response.data : error.message
      );
      setIsAnimating(false);
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'bot', content: "Error occurred while processing your query." }
      ]);
    }
  }
  else{

  }
  };

  // Smooth scroll to bottom when messages update
  useEffect(() => {
    if (conversationsRef.current) {
      conversationsRef.current.scrollTo({
        top: conversationsRef.current.scrollHeight,
        behavior: 'smooth', // Enables smooth scrolling
      });
    }
    if(query != ""){
    // Clear the input field
    setQuery("");
    
    }
  }, [messages]); // This runs whenever the messages state changes

  // Storage clear on LogOut
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className='dashboard'>
        {/* Sidebar */}
        <div className="sidebar">
            <div className='ham-menu'><img src={hamMenu} alt="Menu" /></div>
            <Link to="/login" onClick={clearLocalStorage} className='logout'>
              <LogOut />
            </Link>
        </div>
        {/* Chat */}
        <div className="chat_container">
          <div className="Chat_Nav">
            <img src={Logo} alt="Logo" />
            <div>
              <div>
                <div className="profile_name">{fname} {lname}</div>
                <div className="profile_role">{role}</div>
              </div>
              <div className="profile-circle"><img src={`https://avatar.iran.liara.run/public/${gender}`} alt="Avatar" /></div>
            </div>
          </div>
          <div className="conversations_box">
            <div className={`${startConversation ? 'conversations' : 'startConversation'}`} ref={conversationsRef}>
              <div className='chit_chat'>Hi! {fname}</div>
              <div className='chit_chat' id='HELPUSER'>How can I  help you?</div>
              <Messages messages={messages} />
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
              <input name='query' type="text" value={query} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Type your queries here' required/>
              <button className={`circle ${isAnimating ? 'animate' : ''}`} onClick={handleQuery}>
                <ArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
