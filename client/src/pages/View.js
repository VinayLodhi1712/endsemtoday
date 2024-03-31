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

const View = () => {
  const [Questions, SetQuestions] = useState([]);
  const [Answers, SetAnswers] = useState([]);
  const [Votes, SetVotes] = useState(0);
  const [auth, setAuth] = useAuth();
  const params = useParams();

  async function GetSingleQuestion() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/getSingleQuestion/${params.qid}`
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
        `http://localhost:8000/api/v1/Answer/get_Answer/${params.qid}`
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
  async function UpdateVotes(aid, Votes) {
    try {
      const votevalue = await fetch(
        `http://localhost:8000/api/v1/Answer//Update_Answer_votes/${aid}/${auth.user._id}`,
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
  async function Bookmark(qid) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/auth//Bookmark/${qid}/${auth.user._id}`,
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
  async function Handlevotes(id, updatedvotes) {
    await UpdateVotes(id, updatedvotes);
    GetSingleAnswers();
  }

  useEffect(() => {
    GetSingleQuestion();
    GetSingleAnswers();
  }, []);
  return (
    <Layout>
      <div
        className="d-flex flex-column align-items-center mt-3 "
        style={{ width: "90%", margin: "auto" }}
      >
        <h1>View Question </h1>

        {Questions.length > 0 ? (
          Questions.map((q) => (
            <div class="card p-2 w-100">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0rem" }}>
                      {" "}
                      <b>Question:</b> {q.title}{" "}
                    </p>
                    <footer
                      class="blockquote-footer d-flex align-items-center "
                      style={{ gap: "2rem" }}
                    >
                      <cite title="Source Title">
                        asked by <b>{q.user.Name}</b>{" "}
                        {moment(q.createdAt).fromNow()}
                      </cite>{" "}
                      <LuBookmarkPlus
                        className="Bookmark"
                        onClick={() => {
                          Bookmark(q._id);
                        }}
                      />
                    </footer>
                  </div>
                  <small>
                    <b>Description:</b> {q.question}
                  </small>
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
              <div key={index} className="card d-flex flex-row w-100 ">
                <div
                  className="d-flex flex-column align-items-center  mt-1 justify-content-center"
                  style={{ gap: "0.2rem", marginLeft: "0.5rem" }}
                >
                  <FaRegArrowAltCircleUp
                    className="UpVote"
                    onClick={() => {
                      const updatedVotes = a.votes + 1;
                      SetVotes(updatedVotes);
                      Handlevotes(a._id, updatedVotes);
                    }}
                    title="Upvote"
                  />
                  <p>{a.votes}</p>
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
                  {moment(a.createdAt).fromNow()}
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
                <button className="btn btn-success">Contribute</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default View;
