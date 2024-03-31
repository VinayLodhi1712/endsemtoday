import React from "react";
import "./../../App.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-dark text-light p-1 footer">
      <h3 className="text-center mt-2 pt-1">TALKOFCODE</h3>
      <p className="text-center mt-2 ">
        <NavLink to="/About">About</NavLink>|
        <NavLink to="/ContactUs">Contact</NavLink>
      </p>
    </div>
  );
}

export default Footer;
