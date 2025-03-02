import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { Empty } from "antd";
import "../App.css";

const Technews = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const topic = "coding";
      const language = "en";
      const url = `https://news67.p.rapidapi.com/v2/topic-search?languages=${encodeURIComponent(
        language
      )}&search=${encodeURIComponent(topic)}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "3b66842437mshcaf81fced1636e6p15053bjsnf454e7c9cc4e",
          "X-RapidAPI-Host": "news67.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setNewsData(result.news);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <Layout>
      <h1 className="text-center mt-4 section-title">Get Instant Technical News</h1>
    
        {loading ? (
          <div className="row">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-md-4 col-sm-6 mb-4">
                <div className="news-card card h-100 shadow-sm">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <div className="card-body">
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="rectangular" width={100} height={32} className="mt-2" />
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mt-3">
              <CircularProgress />
              <h5 className="mt-2">Loading...</h5>
            </div>
          </div>
        ) : newsData && newsData.length > 0 ? (
          <div className="row">
            {newsData.map((newsItem, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <div className="news-card card h-100 shadow-sm">
                  {newsItem.Image && (
                    <img src={newsItem.Image} className="card-img-top" alt="News" />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{newsItem.Title.substring(0, 50)}...</h5>
                    <a
                      href={newsItem.Url}
                      className="btn btn-primary btn-sm mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center vh-50">
            <p className="text-center">No news available</p>
            <Empty />
          </div>
        )}
    </Layout>
  );
};

export default Technews;
