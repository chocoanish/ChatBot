import React, { useState } from "react";
import "./Signup.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ button_text }) => {
  //Functions
  
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  const userData = {
    firstName: inputs.firstName,
    lastName: inputs.lastName,
    email: inputs.email,
    password: inputs.password,
    role: inputs.role,
    phone: inputs.phone,
  };
  localStorage.setItem("User_Data", JSON.stringify(userData));

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/auth/signup/',
      headers: {
        // You can add custom headers here if needed
      }
    };
    
    try {
      const response = await axios(config.url, {
        method: config.method,
        data: userData, // Include userData in the request body
        maxBodyLength: config.maxBodyLength,
        headers: config.headers
      });
    
      console.log(response.status, response.data.token);
      localStorage.setItem("User_Data", JSON.stringify(userData));
      navigate('/login');// Redirect to login page after successful signup
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //

  return (
    <>
      {/* Importing Navbar */}
      <Navbar button_text="Log In" redirect="login" />

      {/* SignUp */}
      <div className="container">
        <div className="LogBox">
          <span></span>

          {/* SignUp Parameters */}
          <form className="form" >
            <h1 className="logText">{button_text}</h1>
            <div className="entries">
              {/* Input First Name */}
              <div>
                <label>First Name</label>
                <input
                  className="input"
                  name="firstName"
                  type="name"
                  value={inputs.firstName}
                  onChange = {handleChange}
                  required
                />
              </div>

              {/* Input Last Name */}
              <div>
                <label>Last Name</label>
                <input 
                className="input"
                  name="lastName"
                  value={inputs.lastName}
                  onChange = {handleChange}
                  type="name"
                  required
                   />
              </div>
              <div>
                <label>Email</label>
                <input
                  className="input"
                  name="email"
                  value={inputs.email}
                  onChange = {handleChange}
                  type="email"
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  className="input"
                  name="password"
                  type="password"
                  value={inputs.password}
                  onChange = {handleChange}
                  required
                />
              </div>

              {/* Input Role: like Admin */}
              <div>
                <label>Role</label>
                <input 
                  className="input"
                  name="role"
                  value={inputs.role}
                  onChange = {handleChange}
                  type="name"
                  required
                 />
              </div>

              {/* Input Phone Number */}
              <div>
                <label>Phone Number</label>
                <input 
                className="input"
                  name="mobile"
                  value={inputs.phone}
                  onChange={(e) =>
                    setInputs({ ...inputs, phone: e.target.value })
                  }
                  type="tel"
                  required
                />
              </div>

              {/* After Successful SignUp redirecting to Login page */}
            </div>
            <button type="submit" className="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : button_text}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
