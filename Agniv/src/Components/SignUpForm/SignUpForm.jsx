import React from 'react'
import './SignUpForm.css'

const SignUpForm = ({button_text}) => {
  return (
    <>
        <div className='container'>
            <div className='form'>
                <h1 className='logText'>{button_text}</h1>
                <div className='entries'>
                <div>
                <label>First Name</label>
                <input className='input' name='firstName' type='name' required/>
                </div>
                <div>
                <label>Last Name</label>
                <input className='input' name='lastName' type='name' required/>
                </div>
                <div>
                <label>Password</label>
                <input className='input' name='password' type='password' required/>
                </div>
                <div>
                <label>Role</label>
                <input className='input' name='role' type='name' required/>
                </div>
                <div>
                <label>Phone Number</label>
                <input className='input' name='mobile' type='tel' required/>
                </div>
                </div>
                <a href='dashboard' className='submit'>{button_text}</a>
            </div>
        </div>
    </>
  )
}

export default SignUpForm