import React from 'react'
import "./Home.css"
import Navbar from "../../Components/Navbar/Navbar"
import Content from '../../Components/Landing Page/Content/Content'

const Home = () => {
  return (
    <>
        <Navbar button_text="Log In"/>
        <Content/>
    </>
  )
}

export default Home