import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify for notifications
import {
  FaEnvelope,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaShoppingCart,
  FaQuestionCircle,
  FaNewspaper,
} from "react-icons/fa";
import "./footer.css";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

function Footer() {
  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const apiUrl = process.env.REACT_APP_API_BASE_URL || "https://talkofcodebackend.onrender.com/api/v1";
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.status === 404) {
        console.error(`404 Not Found: ${apiUrl}/subscribe`);
        toast.error("API endpoint not found. Check server routes.");
        setLoading(false);
        return;
      }
  
      const data = await response.json();
      if (response.ok) {
        toast.success( "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error( "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      if (error.message === "Failed to fetch") {
        toast.error("Cannot connect to server. Is your backend running?");
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-section brand-section">
          <h2 className="footer-logo">TALKOFCODE</h2>
          <p className="footer-tagline">
            Your one-stop platform for e-commerce, technical Q&A, and tech news.
          </p>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="newsletter-button" onClick={handleSubscribe} disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          <div className="social-links">
            <a
              href="mailto:vinayanandlodhi12@gmail.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://twitter.com/VinayLodhi1712"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/VinayLodhi1712"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/vinay-anand-lodhi-5694b1234/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
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
