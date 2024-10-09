import React, { useState } from "react";
import "./Signup.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../../hooks/useErrorHandler";
import { enqueueSnackbar } from "notistack";

const Signup = ({ button_text }) => {
  const navigate = useNavigate();
  //Functions
  const ErrorHandle = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(
    {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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

  const validateInputs = () => {
    const errors = [];

    if (!inputs.firstName.trim()) {
      errors.push("First name is required");
    }

    if (!inputs.lastName.trim()) {
      errors.push("Last name is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email.trim() || !emailRegex.test(inputs.email)) {
      errors.push("Valid email is required");
    }

    if (inputs.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    const phoneRegex = /^\d{10}$/;
    if (!inputs.phone.trim() || !phoneRegex.test(inputs.phone)) {
      errors.push("Valid 10-digit phone number is required");
    }

    if (!inputs.gender) {
      errors.push("Please select a gender");
    }

    return errors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateInputs();
    
    if (errors.length === 0) {
      setIsLoading(true);
      // Simulating an API call
      setTimeout(() => {
        const userData = {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          password: inputs.password,
          phone: inputs.phone,
          gender: inputs.gender,
        };
        localStorage.setItem("User_Data", JSON.stringify(userData));
        setIsLoading(false);
        enqueueSnackbar('Signup successful!', { variant: 'success' });
        navigate("/onboard");
      }, 1500);
    } else {
      if (errors.length === 1) {
        enqueueSnackbar(`Please check the ${errors[0]} field`, { variant: 'error' });
      } else if (errors.length <= 3) {
        errors.forEach(error => {
          enqueueSnackbar(`Please check the ${error} field`, { variant: 'error' });
        });
      } else {
        enqueueSnackbar('Please fill all the fields correctly', { variant: 'error' });
      }
    }
  };

  //

  return (
    <>
    <div className="SignUpContent">
      {/* Importing Navbar */}
      <Navbar button_text="Log In" redirect="login" />

      {/* SignUp */}
      <div className="signUpContainer">
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
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : button_text}
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
