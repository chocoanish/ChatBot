import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const Login = ({ button_text }) => {
  //Functions
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/auth/signin",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (response.data && response.data.token) {
        localStorage.setItem("User_Email", inputs.email);
        localStorage.setItem("Bearer_Token", response.data.token);
        setIsLoggedIn(true);
        setUserId(response.data.userId || "defaultUserId"); // Use a default if userId is not provided
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    const token = localStorage.getItem("Bearer_Token");
    try {
      const response = await axios.get(
        `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/chat/query?query=${encodedQuery}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQueryResponse(response.data);
    } catch (error) {
      console.error(
        "Query error:",
        error.response ? error.response.data : error.message
      );
      setQueryResponse("Error occurred while processing your query.");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="query-container">
        <h2>Welcome, {inputs.email}!</h2>
        <form onSubmit={handleQuery}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query"
          />
          <button type="submit">Send Query</button>
        </form>
        {queryResponse && (
          <div className="response">
            <h3>Response:</h3>
            <p>{queryResponse}</p>
          </div>
        )}
      </div>
    );
  }

  //

  return (
    <>
      {/* Importing Navbar */}
      <Navbar button_text="Sign Up" redirect="signup" />

      {/* Login */}
      <div className="container">
        <div className="login_LogBox">
          <span></span>

          {/* Login Parameters */}
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="logText">{button_text}</h1>
            <div className="login_entries">
              <div>
                {/* Input Email */}
                <label htmlFor="email">Email</label>
                <input
                className="input"
                name="Email"
                type="email"
                value={inputs.email}
                onChange={handleChange}
                required 
                />
              </div>
              <div>

                {/* Input Password */}
                <label htmlFor="password">Password</label>
                <input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Asking for new user */}
            <Link to="/signup" className="ask">
              Don't have an account?
            </Link>

            {/* After Successful Login redirect to Dashboard */}
            <Link to="/dashboard" className="login_submit">
              {button_text}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
