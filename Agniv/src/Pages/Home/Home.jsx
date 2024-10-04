import React from 'react'
import "./Home.css"
import Navbar from "../../Components/Navbar/Navbar"
import { CircleCheckBig } from 'lucide-react';
import logo from '../../assets/Logo.svg'

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
          Connect visionaries with a chatbot that fosters seamless networking and collaboration. Empower founders to share insights and build meaningful relationships effortlessly
        </div>
        <a href="/signup" className="SignUp">
          <div>Get Started</div>
        </a>
      </div>
      <section className="Features">
      <div className="Headings">Key Features</div>
      <div className="container">
        <div className="box">
          <span />
          <div className="content">
            <h2>Founder's Interface</h2>
            <p>
            Connect with our expert bot to resolve your challenges and gain valuable insights effortlessly.
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


      <section className='pricing'>
      <div className="Headings">Our Plans</div>
            <div className='cards'>
              <div className='card' id='Free'>
                <div>
                  <div id='free-lifetime'>
                    <div className='price-tag'>
                      <div>Free</div>
                      <div>Lifetime</div>
                    </div>
                  </div>
                </div>
                <div className='price_title'>FREE</div>
                <div className='provide'>
                  <CircleCheckBig/> <p>10 Queries</p>
              </div>
              <button className='order' id='freemium'>Order Now</button>
              </div>
              <div className='card' id='Premium'>
              <div>
                  <div id='per-month'>
                    <div className='price-tag'>
                      <div>$10</div>
                      <div>Per Month</div>
                    </div>
                  </div>
                </div>
                <div className='price_title'>PREMIUM</div>
                <div className='provide'>
                  <CircleCheckBig/> <p>Unlimited Queries</p>
              </div>
              <button className='order' id='premium'>Order Now</button>
              </div>
              <div className='card' id='Premium_Pro'>
              <div>
                  <div id ='per-annum'>
                    <div className ='price-tag'>
                      <div>$100</div>
                      <div>Per Annum</div>
                    </div>
                  </div>
                </div>
                <div className='price_title'>PREMIUM PRO</div>
              <div className='provide'>
                  <CircleCheckBig/> <p>Unlimited Queries</p>
              </div>
              <button className='order' id='pro'>Order Now</button>
              </div>
            </div>
      </section>


      <section className='footer'>
          <div className='Agniv'>
            <img src={logo}></img>
            <p>A place where Growing<br/>minds meet</p>
          </div>
          <div className='footer_links'>
          <div className='block'>
            <h1>Company</h1>
            <a href="">About us</a>
            <a href="">Careers</a>
            <a href="">Support</a>
            <a href="">Knowledgebase</a>
          </div>
          <div className='block'>
          <h1>Features</h1>
            <a href="">Founders meet</a>
            <a href="">IOS & Android</a>
          </div>
          <div className='block'>
          <h1>Contact Us</h1>
            <a href="">info@agniv.com</a>
            <a href="">1-800-200-300</a>
            <a href="">1010 Sunset Blv. <br/>Palo Alto,California</a>
          </div> 
          </div>
      </section>
    </>
  )
}

export default Home