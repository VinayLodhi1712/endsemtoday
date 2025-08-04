import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Tag, Space, Spin } from "antd";
import './dashboard.css';  // Make sure to replace with our enhanced CSS
import { FaUserEdit } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaThumbsUp,
  FaCircleUser,
  FaUserClock,
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { SiAnswer } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { useAuth } from "../context/auth";
import moment from "moment";
import { API_BASE_URL } from "../config/api";

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [auth, SetAuth] = useAuth();
  const [QuestionAsked, SetQuestionAsked] = useState(0);
  const [AnswerAsked, SetAnswerAsked] = useState(0);
  const [Reputation, SetReputation] = useState(0);
  const [loading, setLoading] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  async function GetAllUserQuestion() {
    try {
      const AllQuestion = await fetch(
        `${API_BASE_URL}/Questions/AskedUserQuestion/${auth.user._id}`
      );
      if (AllQuestion.status === 200) {
        const AllQue = await AllQuestion.json();
        SetQuestionAsked(AllQue.questionCount);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function GetAllUserAnswers() {
    try {
      const AllAnswer = await fetch(
        `${API_BASE_URL}/Answer/GetNumberOfQuestions/${auth.user._id}`
      );
      if (AllAnswer.status === 200) {
        const AllAns = await AllAnswer.json();
        SetAnswerAsked(AllAns.AnswerCount);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function GetUserReputation() {
    try {
      const resp = await fetch(
        `${API_BASE_URL}/auth/GetReputation/${auth.user._id}`
      );
      if (resp.status === 200) {
        const reputation = await resp.json();
        SetReputation(reputation.Rep.Reputation);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth?.user?._id) {
      GetAllUserQuestion();
      GetAllUserAnswers();
      GetUserReputation();
    }
  }, [auth]);

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-box">
          {/* Top section with photo */}
          <div className="profile-photo-section">
            <img
              className="profile-photo"
              src={`https://ayushreactbackend.onrender.com/api/v1/auth/get-userPhoto/${auth?.user?._id}`}
              alt="User"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/180?text=User";
              }}
            />
          </div>

          {/* Bottom section with details */}
          <div className="profile-details-section">
            <h3 className="profile-name">{auth?.user?.Name ?? "User Name"}</h3>
            <p className="profile-email">{auth?.user?.Email}</p>

            {/* Social Media Icons */}
            <div className="social-icons">
              {auth?.user?.Website && (
                <a href={auth.user.Website} target="_blank" rel="noopener noreferrer">
                  <FaGlobe />
                </a>
              )}
              {auth?.user?.Github && (
                <a href={auth.user.Github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
              {auth?.user?.LinkedIn && (
                <a href={auth.user.LinkedIn} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
            </div>

            {/* User Details Table */}
            <div className="user-details">
              <p>
                <MdLocationPin /> {auth?.user?.Location ?? "Location not set"}
              </p>
              <p>
                <FaThumbsUp /> Reputation: &nbsp;<span>{Reputation ?? 0}</span>
              </p>
              <p>
                <FaQuestionCircle /> Questions Asked: &nbsp;<span>{QuestionAsked}</span>
              </p>
              <p>
                <SiAnswer /> Questions Answered: &nbsp;<span>{AnswerAsked}</span>
              </p>
              <p>
                <FaUserClock /> Joined: &nbsp;<span>{moment(auth?.user?.createdAt).fromNow()}</span>
              </p>
              <p>
                <FaCode /> Skills: &nbsp;
                {auth?.user?.tags && auth.user.tags.length > 0 ? (
                  auth.user.tags.map((t) => (
                    <Tag color="blue" key={t}>
                      {t}
                    </Tag>
                  ))
                ) : (
                  <span>No skills added yet</span>
                )}
              </p>
            </div>

            {/* Buttons */}
            <div className="profile-buttons">
              <Button type="primary" onClick={showDrawer}>
                User Dashboard
              </Button>
              <NavLink to="/">
                <Button type="primary">Home</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title="User Dashboard"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Close</Button>
          </Space>
        }
      >
        <div
          className="d-flex justify-content-center flex-column align-items-center"
          style={{ gap: "2rem" }}
        >
          <button
            className="btn btn-dark ButtonBorder2 w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/user/Profile"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <FaUserEdit /> Edit Profile
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder2 w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/user/Create-Product"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <FaPlusSquare /> Create Product
            </NavLink>
          </button>
          
          <button
            className="btn btn-dark ButtonBorder2 w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/user/Product"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <MdPublishedWithChanges />
              Update Product
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder2 w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/user/questions"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <BsFillQuestionSquareFill /> Your Questions
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder2 w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/user/Contributions"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <FaHandsHelping />
              Your Contributions
            </NavLink>
          </button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default UserDashboard;



