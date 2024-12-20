import React from "react";
import "./FadeIn.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FaUser } from "react-icons/fa";
import { ReactTyped } from "react-typed";

import chatgpt from "../assests/chatgpt.png";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const FadeIn = () => {
  return (
    <div className="container">
      <div className="question-box">
        <Card className="card3 d-flex flex-column">
          <CardContent className="flex-grow-1">
            <div className="d-flex items-center justify-center">
              <div className="w-20 user-icon">
                <FaUser className="icon" />
              </div>
              <div className="w-80">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="responsive-layout"
                >
                  <ReactTyped
                    strings={[
                      "What is recursion? ^8000",
                      "What is Python? ^5500",
                      "What is Array? ^5000",
                    ]}
                    typeSpeed={40}
                    backSpeed={40}
                    className="answer ff"
                    loop
                  />
                </Typography>
              </div>
            </div>
            <Divider className="divider" />
            <div className="mt-2 d-flex align-items-start">
              <div className="w-20 chatbot-icon">
                <Avatar
                  src={chatgpt}
                  className="icon chatbot-fixed"
                  sx={{
                    width: { xs: "30px", sm: "30px", md: "35px" },
                    height: { xs: "30px", sm: "30px", md: "40px" },
                  }}
                  alt={<FaUser sx={{ width: 30, height: 30 }} />}
                />
              </div>
              <div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="responsive-layout"
                >
                  <ReactTyped
                    strings={[
                      "Recursion is a programming technique where a function calls itself",
                      "Python is a high-level, interpreted programming language",
                      "An array is a fundamental data structure",
                    ]}
                    typeSpeed={100}
                    className="answer ff"
                    loop
                  />
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions className="card-actions" >
            <Link to="/dashboard/user/interaction">
              <button size="small" className="btn-outline-primary" >
                Explore
              </button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default FadeIn;
