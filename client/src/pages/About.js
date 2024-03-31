import React from "react";
import Layout from "../components/layout/layout";
import Contactus from "../assests/Aboutus.jpg";
const About = () => {
  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%", gap: "2rem" }}
      >
        <div style={{ width: "50%", height: "70%" }}>
          <img
            src={Contactus}
            style={{ width: "100%", height: "100%" }}
          ></img>
        </div>
        <div style={{ width: "30%" }} className="flex-column d-flex ">
          <h1
            className="p-3 text-center"
            style={{ backgroundColor: "black", color: "white" }}
          >
            {" "}
            ABOUT US{" "}
          </h1>
          <p>
            Welcome to <mark>TALKOFCODE</mark>, your go-to destination for all
            things code-related! At TalkOfCode, we're more than just a platform
            – we're a vibrant community of learners, creators, and enthusiasts
            united by our passion for coding and technology. Our mission is
            simple: to provide a dynamic space where individuals from all
            backgrounds can come together to learn, share, and grow their coding
            skills. Whether you're a seasoned developer looking to stay
            up-to-date with the latest trends, a student eager to explore the
            world of programming, or an entrepreneur seeking tech solutions,
            TalkOfCode is here to support you every step of the way. But we're
            not just about coding tutorials and discussions. TalkOfCode also
            offers a unique marketplace where members can buy and sell old
            products related to technology, helping to foster a culture of
            sustainability and resourcefulness within our community. Let's code,
            connect, and create together!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
