import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import Card from "react-bootstrap/Card";
import products from "../assests/products.jpg";
import stack from "../assests/stack.jpg";
import technews from "../assests/technews.jpg";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { FaAddressBook, FaShoppingCart, FaComment } from "react-icons/fa";
function Productcard() {
  return (
    <Card className="boxlayout" style={{ width: "25rem" }}>
      <Card.Img variant="top" src={products} />
      <Card.Body>
        <Card.Title className="mediumtitlefont">Helping Students</Card.Title>
        <Card.Text>
          Help Students by providing them a plateform to buy and sell their
          study related materials
        </Card.Text>
        <Link to="/products">
          <button className="btn btn-primary w-100">See Products</button>
        </Link>
      </Card.Body>
    </Card>
  );
}

function Codeconnectcard() {
  return (
    <Card className="boxlayout" style={{ width: "25rem" }}>
      <Card.Img variant="top" src={stack} />
      <Card.Body>
        <Card.Title className="mediumtitlefont w-100">
          Student Doubts Solver
        </Card.Title>
        <Card.Text>
          Help Students by providing them a plateform to ask and provide
          solutions of their doubts
        </Card.Text>
        <Link to="/dashboard/user/interaction">
          <button className="btn btn-primary w-100">Visit Code-Connect</button>
        </Link>
      </Card.Body>
    </Card>
  );
}

function Technewscard() {
  return (
    <Card className="boxlayout" style={{ width: "25rem" }}>
      <Card.Img variant="top" src={technews} />
      <Card.Body>
        <Card.Title className="mediumtitlefont">Tech News Provider</Card.Title>
        <Card.Text>
          Help Students by providing them a plateform where they can get all
          current tech news
        </Card.Text>
        <Link to="/technews">
          <button className="btn btn-primary w-100">See TechNews</button>
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
  }, []);

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
      const response = await fetch(
        "http://localhost:8000/api/v1/product/product-count"
      );
      const data = await response.json();
      setTotalProducts(data.Total);
    } catch (error) {
      console.error("Error fetching product count:", error);
    }
  };

  const fetchQuestionCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/Questions/QuestionCount"
      );
      const data = await response.json();
      setTotalQuestions(data.Total);
    } catch (error) {
      console.error("Error fetching product count:", error);
    }
  };

  return (
    <Layout>
      <p className="Titlefont center" style={{ marginTop: "2rem" }}>
        {" "}
        Welcome to <mark>TALKOFCODE</mark>, your go-to destination for all
        things code-related!
      </p>
      <div className="cards">
        <div>
          <Productcard />
        </div>
        <div className="cardmargin">
          <Codeconnectcard />
        </div>
        <div className="cardmargin">
          <Technewscard />
        </div>
      </div>

      <p className="Titlefont center" style={{ marginTop: "2rem" }}>
        {" "}
        About us
      </p>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%", gap: "2rem" }}
      >
        <div
          className="d-flex justify-content-around"
          style={{ width: "45%", height: "80%", gap: "1rem" }}
        >
          <div>
            <div className="gradient1  p-2 ">
              <div>
                <FaAddressBook />
              </div>
              <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                {({ isVisible }) => (
                  <div style={{ height: 50 }}>
                    {isVisible ? (
                      <h2>
                        <CountUp end={900} />{" "}
                      </h2>
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              <b>Users</b>
            </div>
            <div className="statement">
              <p className="statement-heading">TechNews :</p>
              <p>"Stay Informed, Stay Ahead"</p>
            </div>
          </div>

          <div>
            <div className="gradient2  p-2">
              <div>
                <FaShoppingCart />
              </div>
              <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                {({ isVisible }) => (
                  <div style={{ height: 50 }}>
                    {isVisible ? (
                      <h2>
                        <CountUp end={234} />{" "}
                      </h2>
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>

              <b>Questions Asked</b>
            </div>

            <div className="statement">
              <p className="statement-heading">CodeConnect :</p>
              <p>"Empowering Knowledge Exchange"</p>
            </div>
          </div>

          <div>
            <div className="gradient3  p-2">
              <div>
                <FaComment />
              </div>
              <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                {({ isVisible }) => (
                  <div style={{ height: 50 }}>
                    {isVisible ? (
                      <h2>
                        <CountUp end={342} />{" "}
                      </h2>
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              <b>Products listed</b>
            </div>

            <div className="statement">
              <p className="statement-heading">TalkOfCode :</p>
              <p>"Sustainable Tech Solutions"</p>
            </div>
          </div>

          {/* This will create an empty bottom half */}
        </div>

        <div
          style={{ width: "50%", height: "80%", marginBottom: "1rem" }}
          className="flex-column d-flex "
        >
          <div className="boxlayout smalltitlefont">
            <p>
              At TalkOfCode, we're more than just a platform – we're a vibrant
              community of learners, creators, and enthusiasts united by our
              passion for technology. Our mission is simple: to provide a
              dynamic space where individuals from all backgrounds can come
              together to learn, share, and grow.
            </p>
            <p className="smalltitlefont">
              "Whether you're a seasoned developer, a student, or an
              entrepreneur, TalkOfCode is here to support you every step of the
              way."
            </p>
            <p className="smalltitlefont">
              TalkOfCode also offers a unique marketplace where members can buy
              and sell old tech products, fostering a culture of sustainability
              and resourcefulness within our community. Let's code, connect, and
              create together!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
