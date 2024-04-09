import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import products from "../assests/products.jpg"
import stack from "../assests/stack.jpg";
import technews from "../assests/technews.jpg";
import { Link } from "react-router-dom";
import { FaAddressBook, FaShoppingCart, FaComment } from "react-icons/fa";
function Productcard() {
  return (
    <Card className="boxlayout" style={{ width: '19rem' }}>
      <Card.Img variant="top" src={products} />
      <Card.Body>
        <Card.Title className="mediumtitlefont">Student Helper</Card.Title>
        <Card.Text>
          Help Students by providing them a plateform to buy and sell their study related materials
        </Card.Text>
        <Link to="/products">
        <Button variant="primary">See Products</Button>
      </Link>
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
        <Link to="/dashboard/user/interaction">
        <Button variant="primary">See CodeConnect</Button>
      </Link>
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
        <Link to="/technews">
        <Button variant="primary">See TechNews</Button>
      </Link>
      </Card.Body>
    </Card>
  );
}

const About = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);

  useEffect(() => {
    fetchTotalUsers();
    fetchProductCount();
    fetchQuestionCount();
  }, [])

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/count");

      if (!response.ok) {
        throw new Error("Failed to fetch total users");
      }
      const data = await response.json();
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchProductCount = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/product/product-count');
      const data = await response.json();
      setTotalProducts(data.Total);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  const fetchQuestionCount = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/Questions/QuestionCount');
      const data = await response.json();
      setTotalQuestions(data.Total);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

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

        <div className="boxlayout flexcolumn" style={{ width: "40%", height: "80%" }}>
          <div className="flexrow" style={{ height: "40%" , marginBottom:"1rem"}}>
            <div className="boxlayout smalltitlefont" style={{ flex: 1, margin: "5px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div className="divcenter" style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#0047AB" }}>
                  <FaAddressBook size={20} color="white" />
                </div>
              </div>
              <div className="flexcolumn divcenter ">
                <div className="mediumtitlefont" style={{ textAlign: "center" }}>
                  {totalUsers !== null ? totalUsers : "Loading..."}
                </div>
                <div style={{ textAlign: "center" }}>
                  Registered Users
                </div>
              </div>
            </div>
            <div className="boxlayout smalltitlefont" style={{ flex: 1, margin: "5px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div className="divcenter" style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#0047AB" }}>
                  <FaShoppingCart size={20} color="white" />
                </div>
              </div>
              <div className="flexcolumn divcenter ">
                <div className="mediumtitlefont" style={{ textAlign: "center" }}>
                  {totalProducts !== null ? totalProducts : "Loading..."}
                </div>
                <div style={{ textAlign: "center" }}>
                  Total Products Listed
                </div>
              </div>
            </div>
            <div className="boxlayout smalltitlefont" style={{ flex: 1, margin: "5px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div className="divcenter" style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#0047AB" }}>
                  <FaComment size={20} color="white" />
                </div>
              </div>
              <div className="flexcolumn divcenter ">
                <div className="mediumtitlefont" style={{ textAlign: "center" }}>
                  {totalQuestions !== null ? totalQuestions : "Loading..."}
                </div>
                <div style={{ textAlign: "center" }}>
                  Total Questions Asked
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "50%" , marginTop:"0.5rem"}}>
            <div className="statement">
              <p className="statement-heading">CodeConnect :</p>
              <p>"Empowering Knowledge Exchange"</p>
            </div>
            <div className="statement">
              <p className="statement-heading">TalkOfCode :</p>
              <p>"Sustainable Tech Solutions"</p>
            </div>
            <div className="statement">
              <p className="statement-heading">TechNews :</p>
              <p>"Stay Informed, Stay Ahead"</p>
            </div>
          </div>
          {/* This will create an empty bottom half */}
        </div>

        <div style={{ width: "50%", height: "80%", marginBottom:"1rem" }} className="flex-column d-flex ">

          <div className="boxlayout smalltitlefont">
            <p>At TalkOfCode, we're more than just a platform – we're a vibrant community of learners, creators, and enthusiasts united by our passion for technology. Our mission is simple: to provide a dynamic space where individuals from all backgrounds can come together to learn, share, and grow.</p>
            <p className="smalltitlefont">"Whether you're a seasoned developer, a student, or an entrepreneur, TalkOfCode is here to support you every step of the way."</p>
            <p className="smalltitlefont">TalkOfCode also offers a unique marketplace where members can buy and sell old tech products, fostering a culture of sustainability and resourcefulness within our community. Let's code, connect, and create together!</p>
          </div>

        </div>
      </div>
    </Layout >
  );
};

export default About;
