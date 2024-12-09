import React from "react";
import "./../../App.css";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer bg-richblack-800">
      <div className="d-flex w-100 justify-content-center footerparent">
        <div className="w-50 text-center footer-brand">
          <h3 className="text-center mt-2 pt-1">TALKOFCODE</h3>
          <p>© 2024 All rights reserved.</p>
        </div>

        <div className="d-flex flex-column w-50 align-items-center footerlinks mb-3">
          <div className="d-flex align-items-center flex-wrap justify-content-center">
            <NavLink to="/About" className="foot" activeClassName="active">About</NavLink>
            <span className="Danda">|</span>
            <NavLink to="/ContactUs" className="foot" activeClassName="active">Contact</NavLink>
            <span className="Danda">|</span>
            <NavLink to="#" >Terms</NavLink>
            <span className="Danda">|</span>
            <NavLink to="#" >Privacy</NavLink>
          </div>

          <div className="text-center mt-3 ">
            <a href="mailto:vinayanandlodhi12@gmail.com" target="_blank">
              <FaEnvelope className="icon" />
            </a>
            <a href="https://twitter.com/VinayLodhi1712" target="_blank">
              <FaTwitter className="icon" />
            </a>
            <a
              href="https://github.com/VinayLodhi1712"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/vinay-anand-lodhi-5694b1234/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
