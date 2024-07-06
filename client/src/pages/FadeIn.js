import React from "react";
import './FadeIn.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FaUser } from "react-icons/fa";
import { ReactTyped } from "react-typed";     

import chatgpt from "../assests/chatgpt.png";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

const FadeIn = () => {
  return (
    <div className="container">
      <div className="question-box">
        <Card className="card2">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="d-flex justify-content-center">
              <div className="user-icon">
                <FaUser sx={{ width: 30, height: 30 }} />
              </div>
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
            <Divider className="divider" />
            <Typography variant="body2" color="text.secondary" className="d-flex justify-content-center">
              <div className="chatbot-icon">
                <Avatar src={chatgpt} sx={{ width: 35, height: 40 }} alt={<FaUser sx={{ width: 30, height: 30 }} />} />
              </div>
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
          </CardContent>
          <CardActions className="card-actions">
            <Link to='/dashboard/user/interaction'>
              <button size="small" className="btn-outline-primary">Explore</button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default FadeIn;
