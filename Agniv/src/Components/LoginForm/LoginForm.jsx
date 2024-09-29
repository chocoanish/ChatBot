import React from 'react'
import './LoginForm.css'

const LoginForm = ({button_text}) => {
  return (
    <>
        <div className='container'>
        <div className='LogBox'>
            <div className='form'>
                <h1 className='logText'>{button_text}</h1>
                <div className='entries'>
                <div>
                <label>Email</label>
                <input className='input' name='Email' type='email' required/>
                </div>
                <div>
                <label>Password</label>
                <input className='input' name='Password' type='password' required/>
                </div>
                </div>
                <a href='dashboard' className='submit'>{button_text}</a>
            </div>
            </div>
        </div>
    </>
  )
}

export default LoginForm