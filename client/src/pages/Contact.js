import React, { useState } from "react";
import Layout from "../components/layout/layout";
import Contactus from "../assests/contacus.jpeg";
import AyushProfile from "../assests/ayush.jpg";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub, FaEnvelope, FaLinkedin, FaYoutube } from "react-icons/fa";
import vinayprofile from "../assests/vinayprofile.jpg";
import { toast } from "react-hot-toast";

const ContactForm = () => {
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Message, SetMessage] = useState("");
  const [loading, Setloading] = useState(false);
  async function handleSubmit(e) {
    try {
      Setloading(true);
      e.preventDefault();
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/SubmitUserQueryForm",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            Name,
            Email,
            Message,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("We recieved your query");
        Setloading(false);
        SetName("");
        SetEmail("");
        SetMessage("");
      } else {
        Setloading(false);
        toast.error("please try after some time");
      }
    } catch (error) {
      Setloading(false);
      toast.error("something went wrong");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="mb-3 ">
        <label htmlFor="name" className="form-label smalltitlefont">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          placeholder="Enter your name"
          onChange={(e) => {
            SetName(e.target.value);
          }}
          value={Name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label smalltitlefont">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          required
          placeholder="Enter your email"
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
          value={Email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label smalltitlefont ">
          Message
        </label>
        <textarea
          className="form-control"
          id="message"
          rows="6"
          placeholder="Go ahead! We are Listening..."
          required
          style={{ resize: "none", overflowY: "auto" }}
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
          value={Message}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

const Contact = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center formlayout ">
        {/* Left side: Contact Form */}
        <div style={{ width: "50%" }}>
          <h1 className="Titlefont aqua">Get in Touch</h1>
          <p className="smalltitlefont aqua">
            We are here for you. How can we help?
          </p>
          <ContactForm />
        </div>

        {/* Right side: Contact Image and Details */}
        <div style={{ width: "50%" }}>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <img
              src={Contactus}
              style={{
                width: "52%",
                marginBottom: "-2rem",
                marginLeft: "2.5rem",
              }}
              alt="Contact Us"
            />
          </div>
          <div className="contactlayout" style={{ padding: "1rem" }}>
            <p className="mediumtitlefont center" style={{ marginTop: "0" }}>
              Contact us
            </p>
            <div
              className="smalltitlefont"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <FaEnvelope style={{ marginRight: "0.5rem" }} />{" "}
              asharma7588@gmail.com
            </div>
            <div
              className="smalltitlefont"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <FaPhoneAlt
                style={{ marginRight: "0.5rem", borderRadius: "50%" }}
              />{" "}
              +91 8817687885
            </div>
            <div
              className="smalltitlefont"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TfiHeadphoneAlt style={{ marginRight: "0.5rem" }} /> +91
              8251022728
            </div>
          </div>
        </div>
      </div>
      {/* Team Members */}
      <div
        className="Titlefont"
        style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }}
      >
        Meet the team
      </div>
      <div className="d-flex justify-content-center">
        <div className="memberinfo boxlayout">
          <div className="memberimg">
            <img src={AyushProfile} className="imgstyle" alt="Person 1" />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <p className="smalltitlefont TeamNames">Ayush Sharma</p>
            <p className="smalltitlefont" style={{ margin: "0" }}>
              Developer and Project Manager
            </p>
            <div style={{ display: "flex" }}>
              <div className="icons" style={{ backgroundColor: "black" }}>
                <a
                  href="https://github.com/AyushSharma72"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub />
                </a>
              </div>
              <div className="icons" style={{ backgroundColor: "#ff0000" }}>
                <a
                  href="mailto:asharma7588@gmail.com"
                  style={{ color: "white" }}
                >
                  <FaEnvelope />
                </a>
              </div>
              <div className="icons" style={{ backgroundColor: "#0077b5" }}>
                <a
                  href="https://www.linkedin.com/in/ayush-sharma-a155a8267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaLinkedin />
                </a>
              </div>
              <div className="icons" style={{ backgroundColor: "#8B0000" }}>
                <a
                  href="https://youtube.com/@ayushSharma-fx3pf?feature=shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Team Member 2 */}
        <div className="memberinfo boxlayout">
          <div className="memberimg">
            <img src={vinayprofile} className="imgstyle" alt="Person 1" />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <p className="smalltitlefont TeamNames">Vinay Anand Lodhi</p>
            <p className="smalltitlefont" style={{ margin: "0" }}>
              Developer and Project Manager
            </p>
            <div style={{ display: "flex" }}>
              <div className="icons" style={{ backgroundColor: "black" }}>
                <a
                  href="https://github.com/VinayLodhi1712"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub />
                </a>
              </div>
              <div className="icons" style={{ backgroundColor: "#ff0000" }}>
                <a
                  href="mailto:vinayanandlodhi12@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaEnvelope />
                </a>
              </div>
              <div className="icons" style={{ backgroundColor: "#0077b5" }}>
                <a
                  href="https://www.linkedin.com/in/vinay-anand-lodhi-5694b1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaLinkedin />
                </a>
              </div>
              <div className="icons" style={{ backgroundColor: "#8B0000" }}>
                <a
                  href="https://www.youtube.com/channel/UCDSoSvpgsmz4b6gB1k3OLjg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
