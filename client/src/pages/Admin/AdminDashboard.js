import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Space } from "antd";

import { useAuth } from "../../context/auth";
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
        `http://localhost:8000/api/v1/Questions/AskedUserQuestion/${auth.user._id}`
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
        `http://localhost:8000/api/v1/Answer/GetNumberOfQuestions/${auth.user._id}`
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
      `http://localhost:8000/api/v1/auth/GetReputation/${auth.user._id}`
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
            className="d-flex  flex-column "
            style={{ gap: "1rem", width: "100%" }}
          >
            <button className="btn btn-primary btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/create-Category"
                className="list-group-item list-group-item-action"
              >
                Create Category
              </NavLink>
            </button>
            <button className="btn btn-primary  btn-lg  ButtonBorder">
              <NavLink
                to="/dashboard/admin/create-product"
                className="list-group-item list-group-item-action"
              >
                Create New Product
              </NavLink>
            </button>
            <button className="btn btn-primary  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/Product"
                className="list-group-item list-group-item-action"
              >
                Edit a Product
              </NavLink>
            </button>

            <button className="btn btn-primary  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/Admin/Profile"
                className="list-group-item list-group-item-action"
              >
                Edit Your Profile
              </NavLink>
            </button>

            <button className="btn btn-primary  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/Admin/Users"
                className="list-group-item list-group-item-action"
              >
                Manage Users
              </NavLink>
            </button>

            <button className="btn btn-primary  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/questions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              >
                Your Questions
              </NavLink>
            </button>

            <button className="btn btn-primary  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/Contributions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
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
                    src={`http://localhost:8000/api/v1/auth/get-userPhoto/${auth.user._id}`}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <strong className="UserInfo">Admin Information</strong>
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
                          Admin Dashboard
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
