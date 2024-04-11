import Layout from "../components/layout/layout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Card from "react-bootstrap/Card";
import products from "../assests/products.jpg";
import stack from "../assests/stack.jpg";
import technews from "../assests/technews.jpeg";
import { Link } from "react-router-dom";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center flex-column align-items-center GreenGradient">
        <div>
          <h1 className=" mt-3 w-100 text-center WelcomeText">
            {" "}
            Welcome to <mark>TalkOfCode</mark> – Your Dynamic Tech Community
          </h1>
          <p className="text-center">Empowering Tech Enthusiasts to Learn, Connect, and Innovate.</p>
        </div>

        <div style={{ width: "50%" }}>
          <Slider {...settings}>
            <Card className="boxlayout" style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={technews}
                style={{ height: "20rem" }}
              />
              <Card.Body>
                <Card.Title className="mediumtitlefont">
                  Tech News Provider
                </Card.Title>
                <Card.Text>
                  Help Students by providing them a platform where they can get
                  all current tech news
                </Card.Text>
                <Link to="/technews">
                  <button className="btn btn-primary w-100">
                    See Latest TechNews
                  </button>
                </Link>
              </Card.Body>
            </Card>

            <Card className="boxlayout" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={stack} style={{ height: "20rem" }} />
              <Card.Body>
                <Card.Title className="mediumtitlefont w-100">
                  Student Doubts Solver
                </Card.Title>
                <Card.Text>
                  Help Students by providing them a platform to ask and provide
                  solutions to their doubts
                </Card.Text>
                <Link to="/dashboard/user/interaction">
                  <button className="btn btn-primary w-100">
                    Visit Code-Connect
                  </button>
                </Link>
              </Card.Body>
            </Card>
            <Card className="boxlayout" style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={products}
                style={{ height: "20rem" }}
              />
              <Card.Body>
                <Card.Title className="mediumtitlefont">
                  Helping Students
                </Card.Title>
                <Card.Text>
                  Help Students by providing them a platform to buy and sell
                  their study-related materials
                </Card.Text>
                <Link to="/products">
                  <button className="btn btn-primary w-100">
                    See Products
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Slider>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
