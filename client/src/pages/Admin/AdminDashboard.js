import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Tag, Space } from "antd";
import './dashboard.css';  // Assuming this is where the CSS resides
import {
  FaUserEdit,
  FaPlusSquare,
  FaHandsHelping,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaThumbsUp,
  FaCircleUser,
  FaUserClock,
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdPublishedWithChanges, MdLocationPin } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { SiAnswer } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { useAuth } from "../../context/auth";
import moment from "moment";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [auth, SetAuth] = useAuth();
  const [QuestionAsked, SetQuestionAsked] = useState(0);
  const [AnswerAsked, SetAnswerAsked] = useState(0);
  const [Reputation, SetReputation] = useState(0);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  async function GetAllUserQuestion() {
    try {
      const AllQuestion = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/Questions/AskedUserQuestion/${auth.user._id}`
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
        `https://talkofcodebackend.onrender.com/api/v1/Answer/GetNumberOfQuestions/${auth.user._id}`
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
        `https://talkofcodebackend.onrender.com/api/v1/auth/GetReputation/${auth.user._id}`
      );
      if (resp.status === 200) {
        const reputation = await resp.json();
        SetReputation(reputation.Rep.Reputation);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetAllUserQuestion();
    GetAllUserAnswers();
    GetUserReputation();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center p-3 h-100 profile-container">
        <div className="profile-box">
          {/* Top section with photo */}
          <div className="profile-photo-section">
            <img
              className="profile-photo"
              src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${auth?.user?._id}`}
              alt="Admin"
            />
          </div>

          {/* Bottom section with details */}
          <div className="profile-details-section">
            <h3 className="profile-name">{auth?.user?.Name ?? "Admin Name"}</h3>
            <p className="profile-email">{auth?.user?.Email}</p>

            {/* Social Media Icons */}
            <div className="social-icons">
              <a href={auth?.user?.Website ?? "#"} target="_blank" rel="noopener noreferrer">
                <FaGlobe />
              </a>
              <a href={auth?.user?.Github ?? "#"} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={auth?.user?.LinkedIn ?? "#"} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>

            {/* Admin Details Table */}
            <div className="user-details">
              <p>
                <MdLocationPin /> {auth?.user?.Location ?? "No Location Available"}
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
                <FaUserClock /> Joined: &nbsp;{moment(auth?.user?.createdAt).fromNow()}
              </p>
              <p>
                <FaCode />  <span className="glyphicon glyphicon-eye-open text-primary" />
                Role : &nbsp;  {auth.user.Role == 0 ? "User" : "Admin"}
              </p>
            </div>

            {/* Buttons */}
            <div className="profile-buttons">
              <Button type="primary" onClick={showDrawer}>
                Admin Dashboard
              </Button>
              <NavLink to="/" >
                <Button type="primary">Home</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer for Admin Actions */}
      <Drawer
        title="Admin Dashboard"
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
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/admin/create-Category"
              className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <FaPlusSquare /> Create Category
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <FaPlusSquare /> Create Product
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/admin/Product"
              className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <MdPublishedWithChanges /> Edit a Product
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
              <NavLink
                to="/dashboard/Admin/Profile"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                Edit Your Profile
              </NavLink>
            </button>

            <button
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
              <NavLink
                to="/dashboard/Admin/Users"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              style={{ gap: "0.5rem" }}
              >
                Manage Users
              </NavLink>
            </button>

          <button
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/admin/questions"
              className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <BsFillQuestionSquareFill /> Your Questions
            </NavLink>
          </button>

          <button
            className="btn btn-dark ButtonBorder w-100"
            style={{ fontWeight: "700" }}
          >
            <NavLink
              to="/dashboard/admin/Contributions"
              className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <FaHandsHelping /> Your Contributions
            </NavLink>
          </button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default AdminDashboard;
