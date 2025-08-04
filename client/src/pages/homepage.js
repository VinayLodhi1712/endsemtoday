import HomeLayout from "../components/layout/HomePageLayout";
import BannerCard from "./BannerCard";
import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import homepageimage from "../assests/homepageimage.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { API_BASE_URL } from "../config/api";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FadeIn from "./FadeIn";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineConnectingAirports } from "react-icons/md";
import './service.css';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import ScrollToTop from "react-scroll-to-top";
import "./home.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  transition: "opacity 0.3s ease-in-out",
}));

function Home() {
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);
  const [expanded, setExpanded] = React.useState("false");
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${API_BASE_URL}/product/get-product`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data.products.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const theme = createTheme({
    palette: {
      ochre: {
        darker: blue[900],
        danger: "#f90707",
        dangerHover: "rgb(195, 23, 23)",
      },
    },
  });

  return (
    <HomeLayout>
      <div className="d-flex flex-column">
        <div className="homepage-section d-flex justify-content-around align-items-center HomeFirstDiv">
          <div
            className=" d-flex flex-column justify-content-center align-items-center"
            style={{ gap: "1rem" }}

          >
            <h1 className=" text-center WelcomeText mb-3 mt-2 hometext">
              {" "}
              Welcome to <span style={{ color: "#1fa2ff" }}>TalkOfCode</span>
              <br></br>
              Your Dynamic Tech Platform
            </h1>
            <p className="text-center responsive" style={{ fontSize: "20px"}}>
              Empowering Tech Enthusiasts to Learn, Connect, and Innovate.
            </p>
            <div>
              <div className="hero-cards-grid">
                <div className="hero-card">
                  <div className="hero-card-icon-container" onClick={() => document.querySelector('.hero-card:nth-child(1)').classList.toggle('flipped')}>
                    <div className="hero-card-icon" style={{ backgroundColor: "#009688" }}>
                      🛒
                    </div>
                  </div>
                  <h3>Featured Products</h3>
                  <p>Discover amazing products from our community</p>
                  <NavLink to="/products">
                    <button className="hero-card-btn" style={{ backgroundColor: "#009688" }}>
                      Shop Now
                    </button>
                  </NavLink>
                </div>
                <div className="hero-card">
                  <div className="hero-card-icon-container" onClick={() => document.querySelector('.hero-card:nth-child(2)').classList.toggle('flipped')}>
                    <div className="hero-card-icon" style={{ backgroundColor: "#03A9F4" }}>
                      ✨
                    </div>
                  </div>
                  <h3>Code Connect</h3>
                  <p>Ask questions and get help from the community</p>
                  <NavLink to="/dashboard/Admin/interaction">
                    <button className="hero-card-btn" style={{ backgroundColor: "#03A9F4" }}>
                      Get Help
                    </button>
                  </NavLink>
                </div>
                <div className="hero-card">
                  <div className="hero-card-icon-container" onClick={() => document.querySelector('.hero-card:nth-child(3)').classList.toggle('flipped')}>
                    <div className="hero-card-icon" style={{ backgroundColor: "#FF3E7F" }}>
                      📰
                    </div>
                  </div>
                  <h3>Tech News</h3>
                  <p>Stay updated with latest technology trends</p>
                  <NavLink to="/technews">
                    <button className="hero-card-btn" style={{ backgroundColor: "#FF3E7F" }}>
                      Read News
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
            {/* <img src={homepageimage} className="homepageimage"></img> */}
            <div className="hero-buttons-container">
              <NavLink to="/register">
                <button className="hero-main-btn get-started-btn">
                  Get Started
                </button>
              </NavLink>
              <NavLink to="/About">
                <button className="hero-main-btn about-btn">
                  About Us
                </button>
              </NavLink>
            </div>

           
          </div>

        </div>{" "}

      </div>
      <div
        className="homepage-section d-flex align-items-center flex-column justify-content-center w-100  mb-3"
        data-aos="fade-up"
      >
         
        <h1 className=" w-50 text-center WelcomeText mt-5 ">
          {" "}
          More than <span style={{ color: "#1fa2ff" }}>30+ Products</span> Listed. Checkout Now!
        </h1>
        <div style={{ width: "100%", marginTop: "0%", marginBottom: "2rem" }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading products...</span>
              </div>
              <span className="ms-3">Loading products...</span>
            </div>
          ) : error ? (
            <div className="alert alert-warning text-center" role="alert">
              <h5>Unable to load products</h5>
              <p>Please check your internet connection and try refreshing the page.</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : product.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              <h5>No products available</h5>
              <p>Please check back later for new products.</p>
            </div>
          ) : (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              spaceBetween={20}
            slidesPerView={4}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              modifier: 0,
              slideShadows: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.3,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 1.3,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            style={{ marginBottom: "2rem" }}
            initialSlide={0}
          >
            {product.map((p) => (
              <SwiperSlide key={p._id}>
                <Card
                  style={{
                    width: "16rem",
                    height: "auto",
                    margin: "5px",
                    position: "relative",
                  }}
                >
                  <div className="user-image2 boxshadow">
                    <Card.Img
                      variant="top"
                      src={`${API_BASE_URL}/product/get-productPhoto/${p._id}`}
                      style={{
                        width: "100%",
                        height: "17rem",
                        overflow: "hidden"
                      }}
                      className="unselectable img-fluid"
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                      }}
                    >
                      <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center">
                        <FaCartShopping
                          className="text-white"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </div>
                    </div>
                  </div>

                  <Card.Body>
                    <div className="d-flex justify-content-around smalltitlefont4">
                      <Card.Title className="ff smalltitlefont4 unselectable mb-0 w-60">
                        {p.name}
                      </Card.Title>
                      <p className="text-gray-600 mb-3 w-35">₹{p.price}</p>
                    </div>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
            <div className="center3">
              <NavLink to="/products">
                <button type="submit" className="btn btn-primary mt-4">
                  See More
                </button>
              </NavLink>
            </div>
          </Swiper>
          )}
        </div>
      </div>

      <div className="codeconnecthome mb-5 custom-flex custom-gradient rounded-3xl custom-shadow " style={{ margin: "auto" }}>

        <div className="codeconnecthomechat">
          <FadeIn />
        </div>

        <div className="codeconnecthometext mt-2 mb-4 " >
          <h2 className="font-bold text-black mb-3">
            Have Doubts? <br></br><div className="">Ask them at  <span className="highlighted ff">Code<MdOutlineConnectingAirports />Connect, </span></div>
          </h2>
          <p className=" text-black ff codeconnecthomepara">Ask doubts from experienced people. Share knowledge and learn from others in the community,  Get help from AI.</p>
          <div className="flex ">
            <NavLink to="/dashboard/Admin/interaction">
              <button className="yellowbtn" style={{ marginRight: "4rem" }}>Try it Yourself&rarr;</button>
            </NavLink >
            <NavLink to="/dashboard/Admi n/interaction">
              <button>Get AI help.</button>
            </NavLink>
          </div>
        </div>



      </div>

      {/* <h1 className="text-center WelcomeText mt-2 mb-2">
          Get instant technical news
        </h1> */}
      <div className="technewshome custom-flex custom-gradient rounded-3xl custom-shadow" style={{ margin: "auto" }}>
        <div className="d-flex flex-column justify-content-center">
          <h2
            className="font-bold text-black "
            style={{ marginLeft: "2rem" }}
          >
            Stay updated with the latest tech news
            <span className="highlighted ff"> on our website!</span>
          </h2>
          <p
            className="technewshomepara ff"
          >
            Explore the latest in tech news and stay informed about
            cutting-edge developments, innovations, and trends in the
            ever-evolving world of technology.
          </p>

          <NavLink to="/technews">
            <div style={{ marginLeft: "2rem" }}>
              <button className="yellowbtn text-black">Explore &rarr;</button>
            </div>
          </NavLink>
        </div>

        {/* Right side */}
        <div className="col-md-6">
          <BannerCard />
        </div>
      </div>

      <div className="homepage-section AccordianParent">
        <h1 className=" w-100 text-center WelcomeText mb-3">
          {" "}
          Frequently Asked Questions
        </h1>
        <div className="Accordian1">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
                What is TalkOfCode?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize:"17px", fontWeight: "500" }}>
                TalkOfCode is a dynamic tech community platform that brings
                together tech enthusiasts, students, developers, and
                entrepreneurs to learn, connect, and innovate in the world of
                technology.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
                How can I join TalkOfCode?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize:"17px", fontWeight: "500"  }}>
                Joining TalkOfCode is simple! Click on the "Sign Up" button on
                our homepage, fill in your details, and become part of our
                vibrant community.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
                What services does TalkOfCode offer?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize:"17px", fontWeight: "500"  }}>
                TalkOfCode offers a range of services, including tech news
                updates, a platform for solving student doubts, and a
                marketplace for buying and selling study materials.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel4d-header"
            >
              <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
                How can I contribute to TalkOfCode?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{fontSize:"17px", fontWeight: "500"  }}>
                You can contribute to TalkOfCode by sharing your knowledge,
                answering questions, participating in discussions, and helping
                fellow members of the community.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </div>{" "}

      </div>
      {/* <ScrollToTop smooth color="#766c82" /> */}
      <NavLink to='/ContactUs'>
        <button className="issue-btn" >🤔Facing an issue?</button>
      </NavLink>

    </HomeLayout >
  );
}

export default Home;



