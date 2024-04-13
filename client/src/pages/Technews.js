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
const Technews = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setlodaing] = useState(false);
  useEffect(() => {
    async function fetchNews() {
      setlodaing(true);
      // const topic = "coding";
      // const language = "en";
      // const url = `https://news67.p.rapidapi.com/v2/topic-search?languages=${encodeURIComponent(
      //   language
      // )}&search=${encodeURIComponent(topic)}`;

      // const options = {
      //   method: "GET",
      //   headers: {
      //     "X-RapidAPI-Key":
      //       "df461d9036mshb4f44340f3538d7p13a8bajsn86cdae799e77",
      //     "X-RapidAPI-Host": "news67.p.rapidapi.com",
      //   },
      // };

      // try {
      //   const response = await fetch(url, options);
      //   const result = await response.json();
      //   setNewsData(result.news); // Update newsData state with fetched data
      //   setlodaing(false);
      // } catch (error) {
      //   setlodaing(false);
      //   console.error(error);
      // }

      const url = "https://google-news13.p.rapidapi.com/latest?lr=en-US";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c31e37b590msh53493f64684660cp15092ajsn8c95da3fe0c6",
          "X-RapidAPI-Host": "google-news13.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.items);
        setNewsData(result.items.slice(0, 8));
      } catch (error) {
        console.error(error);
      }
    }
    fetchNews();
  }, []);

  return (
    <Layout>
      <div className="news-container">
        <h2
          className="text-center mb-4 Titlefont"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          Technews
        </h2>

        <div className="card-wrapper">
          {" "}
          {loading ? (
            newsData && newsData.length > 0 ? (
              newsData.map((newsItem, index) => (
                <Card key={index} className="box-layout boxlayout">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={newsItem.Image}
                      alt="News Image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {newsItem.Title}
                      </Typography>

                      <a href={newsItem.Url}>{newsItem.Url}</a>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <div className="d-flex w-100 align-items-center justify-content-center flex-column ">
                <p className="text-center">No news available</p>
                <Empty />
              </div>
            )
          ) : (
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Technews;
