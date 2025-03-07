import React from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaGithub, FaLinkedin, FaShoppingCart, FaQuestionCircle, FaNewspaper } from "react-icons/fa";
import "./footer.css"; // Updated CSS file

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-section brand-section">
          <h2 className="footer-logo">TALKOFCODE</h2>
          <p className="footer-tagline">Your one-stop platform for e-commerce, technical Q&A, and tech news.</p>
        </div>

        {/* Services Column */}
        <div className="footer-section">
          <h5 className="footer-heading">OUR SERVICES</h5>
          <ul className="footer-list">
            <li className="footer-list-item">
              <NavLink to="/products" className="footer-link">
                <FaShoppingCart className="footer-icon" /> Shop
              </NavLink>
            </li>
            <li className="footer-list-item">
              <NavLink to="/dashboard/user/interaction" className="footer-link">
                <FaQuestionCircle className="footer-icon" /> Ask Questions
              </NavLink>
            </li>
            <li className="footer-list-item">
              <NavLink to="/technews" className="footer-link">
                <FaNewspaper className="footer-icon" /> Tech News
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Links Column */}
        <div className="footer-section">
          <h5 className="footer-heading">QUICK LINKS</h5>
          <ul className="footer-list">
            <li className="footer-list-item">
              <NavLink to="/About" className="footer-link">
                About Us
              </NavLink>
            </li>
            <li className="footer-list-item">
              <NavLink to="/ContactUs" className="footer-link">
                Contact
              </NavLink>
            </li>
            <li className="footer-list-item">
              <NavLink to="/terms" className="footer-link">
                Terms of Service
              </NavLink>
            </li>
            <li className="footer-list-item">
              <NavLink to="/privacy" className="footer-link">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Newsletter and Social Column */}
        <div className="footer-section">
          <h5 className="footer-heading">STAY CONNECTED</h5>
          <div className="newsletter-container">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email"
            />
            <button className="newsletter-button">
              Subscribe
            </button>
          </div>
          <div className="social-links">
            <a href="mailto:vinayanandlodhi12@gmail.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
            <a href="https://twitter.com/VinayLodhi1712" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://github.com/VinayLodhi1712" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/vinay-anand-lodhi-5694b1234/" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p>© 2024 TALKOFCODE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;