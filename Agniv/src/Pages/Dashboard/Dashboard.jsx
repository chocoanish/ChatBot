import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import { ArrowUp } from "lucide-react";
import Logo from "../../assets/Logo.png";
import hamMenu from "../../assets/menu.svg";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Messages from "../../Components/Messages/Messages";

const Dashboard = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startConversation, setStartConversation] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const conversationsRef = useRef(null);
  const eventSourceRef = useRef(null);
  const textareaRef = useRef(null);

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
      // Add a new line when Shift+Enter is pressed
      e.preventDefault();
      setQuery(prevQuery => prevQuery + '\n');
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // Submit form when Enter is pressed without Shift
      e.preventDefault();
      handleQuery(e);
    }
  };

  

  const handleQuery = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    setStartConversation(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: query },
    ]);
    setQuery("");

    setIsAnimating(true);
    const encodedQuery = encodeURIComponent(query);
    const token = localStorage.getItem("Bearer_Token");
    const userId = localStorage.getItem("id");

    try {
      const response = await axios.get(
        `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/stream/query?query=${encodedQuery}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsAnimating(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", content: response.data.content },
      ]);

      // Set up SSE for streaming response
      setupSSE(query);
    } catch (error) {
      console.error(
        "Query error:",
        error.response ? error.response.data : error.message
      );
      setIsAnimating(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content: "Error occurred while processing your query..",
          id: "error",
        },
      ]);
      document
        .getElementsByClassName("conversions")[0]
        .scrollTo(0, document.body.scrollHeight);
    }

    setQuery("");
  };


  //Event Source
  const setupSSE = (currentQuery) => {
    const token = localStorage.getItem("Bearer_Token");
    const userId = localStorage.getItem("id");
    const streamUrl = `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/stream/query?query=${currentQuery}userId=${userId}`;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = new EventSource(streamUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    setMessages(
      (prevMessages) =>
        (prevMessages = prevMessages.map((msg) => ({
          ...msg,
          content: msg.content + content,
        })))
    );
  };

  
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  //Event Source: End
  
  useEffect(() => {
    if (conversationsRef.current) {
      conversationsRef.current.scrollTo({
        top: conversationsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  const clearLocalStorage = () => {
    localStorage.clear();
  };

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
