import React from 'react'
import "./Home.css"
import Navbar from "../../Components/Navbar/Navbar"

const Home = () => {


  return (
    <>
        <Navbar button_text="Log In" redirect="login"/>
        <div className="hero_section">
        <div className="head">
          Founders' Secret Weapon <br /> From Conversations <br /> To
          Conversions
        </div>
        <div className="sub_head">
          Bridge the gap between visionaries with a chatbot that facilitates
          seamless networking and collaboration. Designed to help founders
          connect, share insights, and build meaningful relationships, our
          chatbot makes it easier to grow your network and turn ideas into
          action.
        </div>
        <a href="/signup" className="Login">
          <div>Get Started</div>
        </a>
      </div>
      <section className="Features">
      <div className="Key_features">Key Features</div>
      <div className="container">
        <div className="box">
          <span />
          <div className="content">
            <h2>Card one</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="box">
          <span />
          <div className="content">
            <h2>Card two</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="box">
          <span />
          <div className="content">
            <h2>Card Three</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default Home