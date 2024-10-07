import React, { useState } from "react";
import "./Signup.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ button_text }) => {
  const navigate = useNavigate();
  //Functions

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(
    {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
        phone: "",
        gender: ""
      }
    );

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
    gender: inputs.gender,
  };
  const directTo = () =>{
    setIsLoading(true);
    localStorage.setItem("User_Data", JSON.stringify(userData));
    setIsLoading(false);
    navigate("/onboard");
  }

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
                  value={inputs.firstName}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              <div id="gender">
                <p>Gender</p>
                <div>
                  <input
                  className="radio"
                    type="radio"
                    id="male"
                    name="gender"
                    value="boy"
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                  className="radio"
                    type="radio"
                    id="female"
                    name="gender"
                    value="girl"
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>

              {/* After Successful SignUp redirecting to Login page */}
            </div>
            <button
              type="submit"
              className="submit"
              onClick={directTo}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : button_text}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
