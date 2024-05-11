import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import toast from "react-hot-toast";
import { Tag } from "antd";
import moment from "moment";
import "../App.css";
import { Empty } from "antd";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useAuth } from "../context/auth";
import { LuBookmarkPlus } from "react-icons/lu";
import Button from "@mui/material/Button";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";

const View = () => {
  const [Questions, SetQuestions] = useState([]);
  const [Answers, SetAnswers] = useState([]);
  const [Votes, SetVotes] = useState(0);
  const [auth, setAuth] = useAuth();
  const params = useParams();

  async function GetSingleQuestion() {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/Questions/getSingleQuestion/${params.qid}`
      );
      const data = await response.json();
      if (response.status === 200) {
        SetQuestions(data.question);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function GetSingleAnswers() {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/Answer/get_Answer/${params.qid}`
      );
      console.log("worked");
      const data = await response.json();
      if (response.status === 200) {
        SetAnswers(data.response);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  async function UpdateVotes(aid, Votes, ansuid) {
    try {
      const votevalue = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/Answer/Update_Answer_votes/${aid}/${auth.user._id}/${ansuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Votes,
          }),
        }
      );

      if (votevalue.status === 201) {
        toast.success("Vote Counted");
      } else {
        if (votevalue.status === 400) {
          const data = await votevalue.json();
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Something Went wrong");
    }
  }
  async function UpdateDownVotes(aid, Votes, ansuid) {
    try {
      const votevalue = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/Answer/Update_Answer_Down_votes/${aid}/${auth.user._id}/${ansuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Votes,
          }),
        }
      );

      if (votevalue.status === 201) {
        toast.success("DownVote Counted");
      } else {
        if (votevalue.status === 400) {
          const data = await votevalue.json();
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Something Went wrong");
    }
  }
  async function Bookmark(qid) {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/auth//Bookmark/${qid}/${auth.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Question Bookmarked ");
      } else {
        if (response.status === 400) {
          toast.error("Already Bookmarked");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  async function Handlevotes(id, updatedvotes, ansuid) {
    await UpdateVotes(id, updatedvotes, ansuid);
    GetSingleAnswers();
  }
  async function HandleDownvotes(id, updatedvotes, ansuid) {
    await UpdateDownVotes(id, updatedvotes, ansuid);
    GetSingleAnswers();
  }

  useEffect(() => {
    GetSingleQuestion();
    GetSingleAnswers();
  }, []);
  return (
    <Layout>
      <div>
        <div
          className="d-flex flex-column align-items-center "
          style={{ width: "90%", margin: "auto" }}
        >
          <h1 className="mt-3">View Question </h1>

          {Questions.length > 0 ? (
            Questions.map((q) => (
              <div class="card w-100 p-2">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div
                      className="d-flex justify-content-between"
                      style={{ width: "25%" }}
                    >
                      {" "}
                      <div
                        className="d-flex  justify-content-between"
                        style={{ width: "26%" }}
                      >
                        <Avatar
                          src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${q.user._id}`}
                          sx={{ width: 30, height: 30 }}
                        />
                        <p className="UserNameDisplay">{q.user.Name}</p>
                      </div>
                      <div className="d-flex">
                        <p className="light-dull">Asked:</p>

                        <p className="DateDisplay">
                          {" "}
                          {moment(q.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                    </div>

                    <LuBookmarkPlus
                      title="Add to Bookmark"
                      className="Bookmark"
                      onClick={() => {
                        Bookmark(q._id);
                      }}
                    />
                  </div>
                  <blockquote class="blockquote mb-0">
                    <p
                      style={{ marginBottom: "0rem" }}
                      className="QuestionTitle "
                    >
                      {q.title}{" "}
                    </p>
                    <small>{q.question}</small>
                    <div className="d-flex align-items-center w-100 justify-content-between">
                      {" "}
                      <div>
                        {" "}
                        {q.tags.map((tag, index) => (
                          <Tag color="blue">{tag}</Tag>
                        ))}
                      </div>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))
          ) : (
            <>
              {" "}
              <Empty />
            </>
          )}
          <h3 className="d-flex justify-content-start  mt-2 w-100">Answers:</h3>
          <div
            className="w-100 d-flex flex-column align-items-center mb-3"
            style={{ gap: "1rem" }}
          >
            {Answers.length > 0 ? (
              Answers.map((a, index) => (
                <div key={index} className="card d-flex flex-row w-100 p-2">
                  <div
                    className="d-flex flex-column align-items-center  mt-1 justify-content-center"
                    style={{ gap: "0.2rem", marginLeft: "0.5rem" }}
                  >
                    <FaRegArrowAltCircleUp
                      className="UpVote"
                      onClick={() => {
                        const updatedVotes = a.votes + 1;
                        SetVotes(updatedVotes);
                        Handlevotes(a._id, updatedVotes, a.user._id);
                      }}
                      title="Upvote"
                    />
                    <p style={{ margin: "0rem" }}> {a.votes}</p>
                    <FaRegArrowAltCircleDown
                      className="DownVote"
                      title="DownVote"
                      onClick={() => {
                        const updatedVotes = a.votes - 1;
                        SetVotes(updatedVotes);
                        HandleDownvotes(a._id, updatedVotes, a.user._id);
                      }}
                    />
                  </div>
                  <div className="card-body mt-3 ">
                    <b>Answer: </b>
                    {a.answer}
                  </div>

                  <div className="blockquote-footer username mt-1">
                    answered by{" "}
                    <cite title="Source Title">
                      <b>{a.user.Name}</b>
                    </cite>{" "}
                    {moment(a.createdAt).format("MMMM Do YYYY")}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="d-flex flex-column align-items-center"
                style={{ gap: "1rem" }}
              >
                <Empty />
                <NavLink to={`/dashboard/user/answers/${params.qid}`}>
                  <Button variant="contained" color="success">
                    Answer
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
