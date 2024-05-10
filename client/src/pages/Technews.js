import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { Empty } from "antd";
import "../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

const Technews = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setlodaing] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setlodaing(true);
      const topic = "coding";
      const language = "en";
      const url = `https://news67.p.rapidapi.com/v2/topic-search?languages=${encodeURIComponent(
        language
      )}&search=${encodeURIComponent(topic)}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "920ef80cd5msh4c5faac297a869bp14e7a6jsnaca2d223ae90",
          "X-RapidAPI-Host": "news67.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setNewsData(result.news); // Update newsData state with fetched data
        setlodaing(false);
      } catch (error) {
        setlodaing(false);
        console.error(error);
      }
    }
    // fetchNews();
  }, []);

  return (
    <Layout>
      <div className="news-container">
        <h2
          className="text-center mb-4 Titlefont"
          style={{ marginTop: "2rem" }}
        >
          Technews
        </h2>

        <div className="card-wrapper">
          {" "}
          {loading ? (
            <div
              className="w-100 text-center d-flex flex-column align-items-center justify-content-center"
              style={{ gap: "2rem" }}
            >
              <div className="d-flex " style={{ gap: "2rem" }}>
                <div>
                  <Skeleton variant="rectangular" width={310} height={218} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
                <div>
                  <Skeleton variant="rectangular" width={310} height={218} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>

                <div>
                  <Skeleton variant="rectangular" width={310} height={218} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>

                <div>
                  <Skeleton variant="rectangular" width={310} height={218} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
              </div>
              <div>
                <CircularProgress disableShrink /> <h5>Loading...</h5>
              </div>
            </div>
          ) : newsData && newsData.length > 0 ? (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={4}
              loop={true}
              navigation={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 0,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper"
              initialSlide={0}
            >
              {newsData.map((newsItem, index) => (
                <SwiperSlide key={index}>
                  <Card className="box-layout boxlayout">
                    <CardActionArea>
                      {newsItem.Image && ( // Check if Image URL is valid
                        <CardMedia
                          className="news-image"
                          component="img"
                          height="140"
                          image={newsItem.Image}
                          alt="News Image"
                        />
                      )}

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {newsItem.Title.substring(0, 50)}....
                        </Typography>
                        <a
                          href={newsItem.Url}
                          style={{ marginBottom: "1rem" }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {newsItem.Url.substring(0, 30)}
                        </a>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="d-flex w-100 align-items-center justify-content-center flex-column ">
              <p className="text-center">No news available</p>
              <Empty />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Technews;
