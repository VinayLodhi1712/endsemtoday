import React from "react";
import "./../../App.css";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-dark text-light footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 text-center">
            <h3 className="text-center mt-2 pt-1">TALKOFCODE</h3>
            <p>© 2024 All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center">
            <div>
              <div style={{ marginTop: "1rem" }}>
                <NavLink to="/About" className="mx-2">
                  About
                </NavLink>
                |
                <NavLink to="/ContactUs" className="mx-2">
                  Contact
                </NavLink>
                |
                <NavLink to="#" className="mx-2">
                  Terms
                </NavLink>
                |
                <NavLink to="#" className="mx-2">
                  Privacy
                </NavLink>
              </div>

              <div className="text-center mt-3">
                <a href="mailto:asharma7588@gmail.com" target="_blank">
                  <FaEnvelope className="icon" />
                </a>
                <a href="https://twitter.com/VinayLodhi1712" target="_blank">
                  <FaTwitter className="icon" />
                </a>
                <a
                  href="https://github.com/AyushSharma72"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayush-sharma-a155a8267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
