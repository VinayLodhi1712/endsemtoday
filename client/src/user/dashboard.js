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

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [auth, SetAuth] = useAuth();
  const [QuestionAsked, SetQuestionAsked] = useState(0);
  const [AnswerAsked, SetAnswerAsked] = useState(0);
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

  useEffect(() => {
    GetAllUserQuestion();
    GetAllUserAnswers();
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
        <div className="container bootstrap snippets bootdey" style={{width:"80%"}}>
          <div className="panel-body inf-content">
            <div className="row">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <img
                  alt
                  title
                  className="img-circle img-thumbnail isTooltip"
                  src={`http://localhost:8000/api/v1/auth/get-userPhoto/${auth.user._id}`}
                  data-original-title="Usuario"
                />
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
                          Address
                        </td>
                        <td className="Info">{auth.user.Address}</td>
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
                        <td className="Info">4</td>
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

export default AdminDashboard;
