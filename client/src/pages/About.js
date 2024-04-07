import React from "react";
import Layout from "../components/layout/layout";
import Contactus from "../assests/Aboutus.jpg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import products from "../assests/products.jpg"
import stack from "../assests/stack.jpg";
import technews from "../assests/technews.jpg";
import data from "../assests/data.jpg";
function Productcard() {
  return (
    <Card className="boxlayout" style={{ width: '19rem' }}>
      <Card.Img variant="top" src={products} />
      <Card.Body>
        <Card.Title className="mediumtitlefont">Student Helper</Card.Title>
        <Card.Text>
          Help Students by providing them a plateform to buy and sell their study related materials
        </Card.Text>
        <Button variant="primary">See Products</Button>
      </Card.Body>
    </Card>
  );
}

function Codeconnectcard() {
  return (
    <Card className="boxlayout" style={{ width: '19rem' }}>
      <Card.Img variant="top" src={stack} />
      <Card.Body>
        <Card.Title className="mediumtitlefont">Student Doubts Solver</Card.Title>
        <Card.Text>
          Help Students by providing them a plateform to ask and provide solutions of their doubts
        </Card.Text>
        <Button variant="primary">See Codeconnect</Button>
      </Card.Body>
    </Card>
  );
}

function Technewscard() {
  return (
    <Card className="boxlayout" style={{ width: '19rem' }}>
      <Card.Img variant="top" src={technews} />
      <Card.Body>
        <Card.Title className="mediumtitlefont">Tech News Provider</Card.Title>
        <Card.Text>
          Help Students by providing them a plateform where they can get all current tech news
        </Card.Text>
        <Button variant="primary">See TechNews</Button>
      </Card.Body>
    </Card>
  );
}

const About = () => {
  return (
    <Layout>
      <p className="Titlefont center" style={{ marginTop: "2rem" }}> Welcome to <mark>TALKOFCODE</mark>, your go-to destination for all
        things code-related!</p>
      <div className="cards">
        <div><Productcard /></div>
        <div className="cardmargin"><Codeconnectcard /></div>
        <div className="cardmargin"><Technewscard /></div>
      </div>

      <p className="Titlefont center" style={{ marginTop: "2rem" }}> About us</p>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%", gap: "2rem" }}
      >

        <div style={{ width: "40%", height: "75%" }}>
          <img className="boxlayout"
            src={data}
            style={{ width: "100%", height: "100%" }}
          ></img>
        </div>
        <div style={{ width: "50%", height: "75%" }} className="flex-column d-flex ">

          <div className="boxlayout smalltitlefont">
            <p>At TalkOfCode, we're more than just a platform – we're a vibrant community of learners, creators, and enthusiasts united by our passion for technology. Our mission is simple: to provide a dynamic space where individuals from all backgrounds can come together to learn, share, and grow.</p>
            <p className="smalltitlefont">"Whether you're a seasoned developer, a student, or an entrepreneur, TalkOfCode is here to support you every step of the way."</p>
            <p className="smalltitlefont">TalkOfCode also offers a unique marketplace where members can buy and sell old tech products, fostering a culture of sustainability and resourcefulness within our community. Let's code, connect, and create together!</p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
