import HomeLayout from "../components/layout/HomePageLayout";

import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import products from "../assests/products.jpeg";
import stack from "../assests/stack.jpeg";
import technews from "../assests/techphoto.jpeg";
import HomeImg from "../assests/homepageimage.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  // };

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
        <div className="d-flex justify-content-around align-items-center HomeFirstDiv">
          <div
            className="w-50 d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-right"
            style={{ gap: "1rem" }}
          >
            <h1 className=" mt-3  text-center WelcomeText">
              {" "}
              Welcome to <mark>TalkOfCode</mark>
              <br></br>
              Your Dynamic Tech Community
            </h1>
            <p className="text-center">
              Empowering Tech Enthusiasts to Learn, Connect, and Innovate.
            </p>
            <ThemeProvider theme={theme}>
              <NavLink to="/About">
                <Button variant="contained" sx={{ bgcolor: "ochre.darker" }}>
                  About us
                </Button>
              </NavLink>
            </ThemeProvider>
          </div>
          <img src={HomeImg} className="h-75 " data-aos="fade-left"></img>
        </div>{" "}
        <div className="d-flex align-items-center flex-column justify-content-center w-100 HomeSecondDiv">
          <h1 className=" w-50 text-center WelcomeText" data-aos="fade-left">
            {" "}
            Our Services
          </h1>
          <div style={{ width: "100%", marginTop: "0%" }}>
            <Swiper
              effect={"coverflow"}
              navigation={true}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper"
              initialSlide={1}
            >
              {/* slide 1 */}
              <SwiperSlide>
                <Card
                  className="boxlayout"
                  style={{ width: "25rem", height: "25rem" }}
                  data-aos="fade-right"
                >
                  <Card.Img
                    variant="top"
                    src={products}
                    style={{ height: "70%" }}
                    className="unselectable"
                  />
                  <Card.Body>
                    <Card.Title className="mediumtitlefont unselectable">
                      Buy and Sell Products
                    </Card.Title>

                    <Link to="/products">
                      <button className="btn btn-primary w-100">
                        See Products
                      </button>
                    </Link>
                  </Card.Body>
                </Card>
              </SwiperSlide>
              {/* slide 2 */}

              <SwiperSlide>
                <Card
                  data-aos="fade-up"
                  // data-aos-duration="1000"
                  className="boxlayout"
                  style={{ width: "25rem", height: "25rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={stack}
                    style={{ height: "70%" }}
                    className="unselectable"
                  />
                  <Card.Body>
                    <Card.Title className="mediumtitlefont  unselectable w-100">
                      Student Doubts Solver
                    </Card.Title>

                    <Link to="/dashboard/user/interaction">
                      <button className="btn btn-primary w-100">
                        Visit Code-Connect
                      </button>
                    </Link>
                  </Card.Body>
                </Card>
              </SwiperSlide>

              {/* slide 3 */}
              <SwiperSlide>
                <Card
                  data-aos="fade-left"
                  className="boxlayout "
                  style={{ width: "25rem", height: "25rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={technews}
                    style={{ height: "60%" }}
                    className="unselectable"
                  />
                  <Card.Body>
                    <Card.Title className="mediumtitlefont unselectable">
                      Browse Tech News
                    </Card.Title>

                    <Link to="/technews">
                      <button className="btn btn-primary w-100">
                        See Latest TechNews
                      </button>
                    </Link>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="AccordianParent">
          <h1
            className=" w-100 text-center WelcomeText mb-3"
            data-aos="fade-right"
          >
            {" "}
            Frequently Asked Questions
          </h1>
          <div className="Accordian1" data-aos="fade-left">
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
                <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
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
                <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
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
                <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
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
                <Typography style={{ fontFamily: "unset", fontWeight: "600" }}>
                  You can contribute to TalkOfCode by sharing your knowledge,
                  answering questions, participating in discussions, and helping
                  fellow members of the community.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>{" "}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
