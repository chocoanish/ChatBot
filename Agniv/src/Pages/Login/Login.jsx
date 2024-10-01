import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Navbar from "../../Components/Navbar/Navbar";


const Login = ({ button_text }) => {
  //Functions
  


  return (
    <>
      {/* Importing Navbar */}
      <Navbar button_text="Sign Up" redirect="signup" />
    
      {/* Login */}
      <div className="container">
        <div className="login_LogBox">
          <span></span>

          {/* Login Parameters */}
          <form className="form">
            <h1 className="logText">{button_text}</h1>
            <div className="login_entries">
              <div>
                {/* Input Email */}
                <label>Email</label>
                <input className="input" name="Email" type="email" required />
              </div>
              <div>
                {/* Input Password */}
                <label>Password</label>
                <input
                  className="input"
                  name="Password"
                  type="password"
                  required
                />
              </div>
            </div>

            {/* Asking for new user */}
            <Link to="/signup" className="ask">
              {"Don't"} have an account?
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
