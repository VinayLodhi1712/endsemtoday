import React from "react";
import Layout from "../components/layout/layout";
import Contactus from "../assests/contactus.png";
import { MdEmail } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaPhoneAlt } from "react-icons/fa";
const Contact = () => {
  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%", gap: "2rem" }}
      >
        <div style={{ width: "50%", height: "70%" }}>
          <img src={Contactus} style={{ width: "100%", height: "100%" }}></img>
        </div>
        <div
          style={{ width: "30%", fontWeight: "700" }}
          className="flex-column d-flex "
        >
          <h1
            className="p-3 text-center"
            style={{ backgroundColor: "black", color: "white" }}
          >
            CONTACT US
          </h1>
          <p>Contact us for an kind of query</p>
          <p>
            <MdEmail /> : asharma7588@gmail.com
          </p>
          <p>
            <FaPhoneAlt /> : +91 8817687885
          </p>
          <p>
            <TfiHeadphoneAlt /> : +91 8251022728
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
