import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Tag, Space, Spin, Badge } from "antd";
import './dashboard.css';
import {
  FaUserEdit,
  FaPlusSquare,
  FaHandsHelping,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaThumbsUp,
  FaUserCircle,
  FaUserClock,
  FaCode,
  FaQuestionCircle,
  FaUsers,
} from "react-icons/fa";
import { MdPublishedWithChanges, MdLocationPin, MdCategory } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { SiAnswer } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { API_BASE_URL } from "../../config/api";

const AdminDashboard = () => {
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
    } finally {
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
          <div className="profile-photo-section" style={{ backgroundColor: "#2c3e50" }}>
            <Badge count="Admin" color="#28a745" style={{ fontSize: '0.8rem' }}>
              <img
                className="profile-photo"
                src={`${API_BASE_URL}/auth/get-userPhoto/${auth?.user?._id}`}
                alt="Admin"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/180?text=Admin";
                }}
              />
            </Badge>
          </div>

          {/* Bottom section with details */}
          <div className="profile-details-section">
            <h3 className="profile-name">{auth?.user?.Name ?? "Admin Name"}</h3>
            <p className="profile-email">{auth?.user?.Email}</p>

            {/* Social Media Icons */}
            <div className="social-icons">
              {auth?.user?.Website && (
                <a href={auth.user.Website} target="_blank" rel="noopener noreferrer" title="Website">
                  <FaGlobe style={{ color: "#3498db" }} />
                </a>
              )}
              {auth?.user?.Github && (
                <a href={auth.user.Github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <FaGithub style={{ color: "#333" }} />
                </a>
              )}
              {auth?.user?.LinkedIn && (
                <a href={auth.user.LinkedIn} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <FaLinkedin style={{ color: "#0077b5" }} />
                </a>
              )}
            </div>

            {/* Admin Details Table */}
            <div className="user-details" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <p>
                <MdLocationPin style={{ color: "#e74c3c" }} /> 
                {auth?.user?.Location ?? "No Location Available"}
              </p>
              <p>
                <FaThumbsUp style={{ color: "#3498db" }} /> 
                Reputation: &nbsp;<span style={{ fontWeight: "bold" }}>{Reputation ?? 0}</span>
              </p>
              <p>
                <FaQuestionCircle style={{ color: "#f39c12" }} /> 
                Questions Asked: &nbsp;<span style={{ fontWeight: "bold" }}>{QuestionAsked}</span>
              </p>
              <p>
                <SiAnswer style={{ color: "#27ae60" }} /> 
                Questions Answered: &nbsp;<span style={{ fontWeight: "bold" }}>{AnswerAsked}</span>
              </p>
              <p>
                <FaUserClock style={{ color: "#8e44ad" }} /> 
                Joined: &nbsp;<span style={{ fontWeight: "bold" }}>{moment(auth?.user?.createdAt).fromNow()}</span>
              </p>
              <p>
                <FaCode style={{ color: "#2c3e50" }} />
                Role: &nbsp;<span style={{ 
                  fontWeight: "bold", 
                  color: "#fff", 
                  backgroundColor: "#28a745", 
                  padding: "2px 8px", 
                  borderRadius: "4px" 
                }}>
                  {auth.user.Role == 0 ? "User" : "Admin"}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="profile-buttons">
              <Button 
                type="primary" 
                onClick={showDrawer} 
                style={{ 
                  backgroundColor: "#2c3e50", 
                  borderColor: "#2c3e50",
                  fontWeight: "500"
                }}
              >
                Admin Dashboard
              </Button>
              <NavLink to="/">
                <Button 
                  type="primary" 
                  style={{ 
                    backgroundColor: "#3498db", 
                    borderColor: "#3498db",
                    fontWeight: "500"
                  }}
                >
                  Home
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer for Admin Actions */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUserCircle size={20} style={{ color: "#2c3e50" }} />
            <span style={{ fontWeight: "bold", color: "#2c3e50" }}>Admin Dashboard</span>
          </div>
        }
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        headerStyle={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #eaeaea" }}
        bodyStyle={{ backgroundColor: "#fff", padding: "20px" }}
        extra={
          <Space>
            <Button 
              onClick={onClose}
              style={{ borderColor: "#e74c3c", color: "#e74c3c" }}
            >
              Close
            </Button>
          </Space>
        }
      >
        <div
          className="d-flex justify-content-center flex-column align-items-center"
          style={{ gap: "1rem" }}
        >
          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#2c3e50",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/admin/create-Category"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
            >
              <MdCategory /> Create Category
            </NavLink>
          </button>

          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#3498db",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
            >
              <FaPlusSquare /> Create Product
            </NavLink>
          </button>

          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#16a085",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/admin/Product"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
            >
              <MdPublishedWithChanges /> Edit a Product
            </NavLink>
          </button>

          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#9b59b6",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/Admin/Profile"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
            >
              <FaUserEdit /> Edit Your Profile
            </NavLink>
          </button>

          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#e74c3c",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/Admin/Users"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
            >
              <FaUsers /> Manage Users
            </NavLink>
          </button>

          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#f39c12",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/admin/questions"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
            >
              <BsFillQuestionSquareFill /> Your Questions
            </NavLink>
          </button>

          <button
            className="btn ButtonBorder2 w-100"
            style={{ 
              fontWeight: "700", 
              backgroundColor: "#27ae60",
              transition: "all 0.3s ease",
              marginBottom: "0.5rem",
              borderRadius: "8px"
            }}
          >
            <NavLink
              to="/dashboard/admin/Contributions"
              className="list-group-item list-group-item-action d-flex justify-content-center align-items-center"
              style={{ gap: "0.5rem", color: "white" }}
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



