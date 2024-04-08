import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Technews = () => {
  const [newsData, setNewsData] = useState(null);

//   useEffect(() => {
//     async function fetchNews() {
//       const topic = "coding";
//       const language = "en";
//       const url = `https://news67.p.rapidapi.com/v2/topic-search?languages=${encodeURIComponent(
//         language
//       )}&search=${encodeURIComponent(topic)}`;

//       const options = {
//         method: "GET",
//         headers: {
//           "X-RapidAPI-Key":
//             "df461d9036mshb4f44340f3538d7p13a8bajsn86cdae799e77",
//           "X-RapidAPI-Host": "news67.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         setNewsData(result.news); // Update newsData state with fetched data
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchNews();
//   }, []);

  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <h2>Technews</h2>
        {newsData && newsData.length > 0 ? (
          newsData.map((newsItem) => (
            <Card
              className="boxlayout"
              key={newsItem.Title} // Assuming 'Title' is a unique identifier
              sx={{ maxWidth: 345 }}
            >
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
                  <Typography variant="body2" color="text.secondary">
                    {newsItem.PublishedOn}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </Layout>
  );
};

export default Technews;
