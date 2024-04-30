import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import moment from "moment";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Tag } from "antd";
const UserInformation = () => {
  const [auth, SetAuth] = useAuth();
  const [QuestionAsked, SetQuestionAsked] = useState(0);
  const [AnswerAsked, SetAnswerAsked] = useState(0);
  const [Reputation, SetReputation] = useState(0);
  const [User, SetUser] = useState("");
  const { Userid } = useParams();

  async function GetUserDetails() {
    try {
      const Response = await fetch(
        `http://localhost:8000/api/v1/auth/Getuserinfo/${Userid}`
      );
      if (Response) {
        const data = await Response.json();
        if (Response.status == 200) {
          SetUser(data.user);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  async function GetAllUserQuestion() {
    try {
      const AllQuestion = await fetch(
        `http://localhost:8000/api/v1/Questions/AskedUserQuestion/${Userid}`
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
        `http://localhost:8000/api/v1/Answer/GetNumberOfQuestions/${Userid}`
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
      `http://localhost:8000/api/v1/auth/GetReputation/${Userid}`
    );
    if (resp.status === 200) {
      const reputation = await resp.json();
      SetReputation(reputation.Rep.Reputation);
    }
  }

  useEffect(() => {
    GetUserDetails();
    GetAllUserQuestion();
    GetAllUserAnswers();
    GetUserReputation();
  }, []);
  return (
    <Layout>
      <div className="d-flex align-items-center h-100 flex-column justify-content-center gap-2">
        <div className="container bootstrap snippets bootdey">
          <div className="panel-body inf-content">
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    style={{ width: "90%" }}
                    src={`http://localhost:8000/api/v1/auth/get-userPhoto/${Userid}`}
                  />
                  <div className="d-flex gap-3">
                    {User.Github ? (
                      <NavLink to={User.Github} className="NavlinksDesign">
                        {" "}
                        <FaGithub />
                      </NavLink>
                    ) : null}
                    {User.LinkedIn ? (
                      <NavLink to={User.LinkedIn} className="NavlinksDesign">
                        {" "}
                        <FaLinkedin />
                      </NavLink>
                    ) : null}
                    {User.Website ? (
                      <NavLink to={User.Website} className="NavlinksDesign">
                        {" "}
                        <FaGlobe />{" "}
                        <span className="Smalltxt"> {User.Website}</span>
                      </NavLink>
                    ) : null}
                  </div>
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
                        <td className="Info">{User._id}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-user  text-primary" />
                          Name
                        </td>
                        <td className="Info">{User.Name}</td>
                      </tr>

                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-eye-open text-primary" />
                          Role
                        </td>
                        <td className="Info">
                          {User.Role == 0 ? "User" : "Admin"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-envelope text-primary" />
                          Email
                        </td>
                        <td className="Info">{User.Email}</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          Location
                        </td>
                        <td className="Info">{User.Location}</td>
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
                          {moment(User.createdAt).fromNow()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="glyphicon glyphicon-calendar text-primary" />
                          SkillSet
                        </td>

                        <td className="Info">
                          {User.tags && User.tags.length > 0 ? (
                            <>
                              {User.tags.map((t) => (
                                <Tag color="blue" key={t}>
                                  {t}
                                </Tag>
                              ))}
                            </>
                          ) : (
                            "Not Set"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavLink to="/Users">
          <button className="btn btn-dark">Back</button>
        </NavLink>
      </div>
    </Layout>
  );
};

export default UserInformation;
