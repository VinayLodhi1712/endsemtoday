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
import { IoCall } from "react-icons/io5";
import Image from "antd";

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
        `https://talkofcodebackend.onrender.com/api/v1/auth/Getuserinfo/${Userid}`
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
        `https://talkofcodebackend.onrender.com/api/v1/Questions/AskedUserQuestion/${Userid}`
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
        `https://talkofcodebackend.onrender.com/api/v1/Answer/GetNumberOfQuestions/${Userid}`
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
      `https://talkofcodebackend.onrender.com/api/v1/auth/GetReputation/${Userid}`
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
      <div className="d-flex align-items-center h-100 flex-column justify-content-center gap-2 ">
        <div className=" d-flex justify-content-around w-100">
          <div className="panel-body inf-content " style={{ width: "65%" }}>
            <div className="row">
              <div className="col-md-4 UserInfoImage">
                <img
                  style={{ width: "100%", height: "28rem" }}
                  src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${Userid}`}
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
          {User.Github || User.LinkedIn || User.Website || User.MobileNo ? (
            <div
              className="d-flex flex-column align-items-center "
              style={{ width: "25%" }}
            >
              <h4> Contact Info</h4>
              <div className="d-flex flex-column gap-3 contactinfo p-2 w-100">
                {User.Github ? (
                  <NavLink
                    to={User.Github}
                    className="NavlinksDesign d-flex gap-2"
                  >
                    {" "}
                    <FaGithub />
                    <span className="Smalltxt"> {User.Github}</span>
                  </NavLink>
                ) : null}
                {User.LinkedIn ? (
                  <NavLink
                    to={User.LinkedIn}
                    className="NavlinksDesign d-flex gap-2"
                  >
                    {" "}
                    <FaLinkedin />
                    <span className="Smalltxt"> {User.LinkedIn}</span>
                  </NavLink>
                ) : null}
                {User.Website ? (
                  <NavLink
                    to={User.Website}
                    className="NavlinksDesign d-flex gap-2"
                  >
                    {" "}
                    <FaGlobe />{" "}
                    <span className="Smalltxt"> {User.Website}</span>
                  </NavLink>
                ) : null}
                {User.MobileNo ? (
                  <div className="NavlinksDesign d-flex gap-2">
                    {" "}
                    <IoCall />
                    <span className="numberStyle"> {User.MobileNo}</span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            "No contact info"
          )}
        </div>

        <NavLink to="/Users">
          <button className="btn btn-primary">Back</button>
        </NavLink>
      </div>
    </Layout>
  );
};

export default UserInformation;
