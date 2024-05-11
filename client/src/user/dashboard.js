import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Radio, Space } from "antd";

import { useAuth } from "../context/auth";
import { FaUserEdit } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import moment from "moment";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const UserDashboard = () => {
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

      if (AllQuestion.status == 200) {
        const AllQue = await AllQuestion.json();
        SetQuestionAsked(AllQue.questionCount);
      }
      console.log(QuestionAsked);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetAllUserAnswers() {
    try {
      const AllAnswer = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/Answer/GetNumberOfQuestions/${auth.user._id}`
      );

      if (AllAnswer.status == 200) {
        const AllAns = await AllAnswer.json();
        SetAnswerAsked(AllAns.AnswerCount);
      }
      console.log(QuestionAsked);
    } catch (error) {
      console.log(error);
    }
  }
  async function GetUserReputation() {
    const resp = await fetch(
      `https://talkofcodebackend.onrender.com/api/v1/auth/GetReputation/${auth.user._id}`
    );
    if (resp.status === 200) {
      const reputation = await resp.json();
      SetReputation(reputation.Rep.Reputation);
    }
  }

  useEffect(() => {
    GetAllUserQuestion();
    GetAllUserAnswers();
    GetUserReputation();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center h-100 p-3">
        <div className="d-flex flex-column justify-content-center  align-items-center"></div>
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
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/Profile"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <FaUserEdit /> Edit Profile
              </NavLink>
            </button>

            {/* <button
  className="btn btn-dark ButtonBorder w-100"
  style={{ fontWeight: "700" }}
>
  <NavLink
    to="/dashboard/user/Orders"
    className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
    style={{ gap: "0.5rem" }}
  >
    <BsFillCartCheckFill /> Your Orders
  </NavLink>
</button> */}

            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/Create-Product"
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
                to="/dashboard/user/Product"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <MdPublishedWithChanges />
                Update Product
              </NavLink>
            </button>

            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/questions"
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
                to="/dashboard/user/Contributions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <FaHandsHelping />
                Your Contributions
              </NavLink>
            </button>
          </div>
        </Drawer>
        <div className="container bootstrap snippets bootdey">
          <div className="panel-body inf-content">
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    style={{ width: "90%" }}
                    src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${auth.user._id}`}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <strong className="UserInfo">User Information</strong>
                <br />
                <div className="table-responsive">
                  <table className="table table-user-information">
                    <tbody>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-asterisk text-primary" />
                          Id
                        </td>
                        <td className="Info">{auth.user._id}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-user  text-primary" />
                          Name
                        </td>
                        <td className="Info">{auth.user.Name}</td>
                      </tr>

                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-eye-open text-primary" />
                          Role
                        </td>
                        <td className="Info">
                          {auth.user.Role == 0 ? "User" : "Admin"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-envelope text-primary" />
                          Email
                        </td>
                        <td className="Info">{auth.user.Email}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Location
                        </td>
                        <td className="Info">{auth.user.Location}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Question Asked
                        </td>
                        <td className="Info">{QuestionAsked}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Question Answered
                        </td>
                        <td className="Info">{AnswerAsked}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Reputation
                        </td>
                        <td className="Info">{Reputation}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Joined
                        </td>
                        <td className="Info">
                          {moment(auth.user.createdAt).fromNow()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Get connected with social media
                        </td>
                        <td className="Info">
                          <div className="d-flex gap-4">
                            {auth.user.Github ? (
                              <NavLink
                                to={auth.user.Github}
                                className="NavlinksDesign"
                              >
                                {" "}
                                <FaGithub />
                              </NavLink>
                            ) : null}
                            {auth.user.LinkedIn ? (
                              <NavLink
                                to={auth.user.LinkedIn}
                                className="NavlinksDesign"
                              >
                                {" "}
                                <FaLinkedin />
                              </NavLink>
                            ) : null}
                            {auth.user.Website ? (
                              <NavLink
                                to={auth.user.Website}
                                className="NavlinksDesign"
                              >
                                {" "}
                                <FaGlobe />{" "}
                                <span className="Smalltxt">
                                  {" "}
                                  {auth.user.Website}
                                </span>
                              </NavLink>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                      <Space>
                        <Button type="primary" onClick={showDrawer}>
                          User Dashboard
                        </Button>
                      </Space>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
