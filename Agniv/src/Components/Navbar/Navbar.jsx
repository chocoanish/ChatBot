import React from "react";
import LogoImg from "../../assets/Logo.svg";
import "./Navbar.css";
const Navbar = ({button_text,redirect}) => {
  return (
    <>
      <div className="Navbar">
        <a href="/"><img className="LogoImg" src={LogoImg} /></a>
        <div className="Links">
          <a href="" className="Products Link">Products</a>
          <a href="" className="Services Link">Services</a>
          <a href="" className="About Link">About</a>
          <a href="" className="Connect Link">Connect</a>
        </div>
        <a href="/auth/login" className="Signup">
            <div>{button_text}</div>
        </a>
      </div>
    </>
  );
};

export default Navbar;
