import React from 'react'
import './Signup.css'
import Navbar from '../../Components/Navbar/Navbar'
import SignUp from '../../Components/SignUpForm/SignUpForm'

const Signup = () => {
  return (
    <>
      <Navbar button_text = "Sign Up" redirect="signup"/>
      <SignUp button_text = "Sign Up"/>
    </>
  )
}

export default Signup