import React from "react";
import "./Signup.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Signup = ({ button_text }) => {

  //Functions


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
          <form className="form">
            <h1 className="logText">{button_text}</h1>
            <div className="entries">
              {/* Input First Name */}
              <div>
                <label>First Name</label>
                <input
                  className="input"
                  name="firstName"
                  type="name"
                  required
                />
              </div>

              {/* Input Last Name */}
              <div>
                <label>Last Name</label>
                <input className="input" name="lastName" type="name" required />
              </div>
              <div>
                <label>Password</label>
                <input
                  className="input"
                  name="password"
                  type="password"
                  required
                />
              </div>

              {/* Input Role: like Admin */}
              <div>
                <label>Role</label>
                <input className="input" name="role" type="name" required />
              </div>

              {/* Input Phone Number */}
              <div>
                <label>Phone Number</label>
                <input className="input" name="mobile" type="tel" required />
              </div>

              {/* After Successful SignUp redirecting to Login page */}
            </div>
            <Link to="/login" className="submit">
              {button_text}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
