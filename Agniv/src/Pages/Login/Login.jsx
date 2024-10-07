import React, { useContext, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/auth/signin",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      
      console.log(response);
      if (response.data && response.data.jwt) {
        localStorage.setItem("User_Email", inputs.email);
        localStorage.setItem("Bearer_Token", response.data.jwt);
        setUserId(response.data.message);
        localStorage.setItem("id", response.data.message);
        setUserId(response.data.message || "defaultUserId"); // Use a default if userId is not provided
        navigate('/dashboard'); // Redirect to dashboard after successful login


        
      } else {
        console.error("Login failed: No token received");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setIsLoading(false);
    }
  };

  //

  return (
    <>
      {/* Importing Navbar */}
      <Navbar button_text="Sign Up" redirect="signup" />

      {/* Login */}
      <div className="login_container">
        <div className="login_LogBox">
          <span></span>

          {/* Login Parameters */}
          <form className="form">
            <h1 className="logText">{button_text}</h1>
            <div className="login_entries">
              <div>
                {/* Input Email */}
                <label>Email</label>
                <input
                className="input"
                name="email"
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
            <button type="submit" className="login_submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : button_text }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
