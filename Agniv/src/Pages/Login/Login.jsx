import React from 'react'
import './Login.css'
import Navbar from '../../Components/Navbar/Navbar'
import LoginForm from '../../Components/LoginForm/LoginForm'

const Login = () => {
  return (
    <>
        <Navbar button_text = "Log In" redirect="login"/>
        <LoginForm button_text = "Log In"/>
    </>
  )
}

export default Login