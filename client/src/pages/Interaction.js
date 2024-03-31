import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/layout/layout";
import { MdOutlineConnectingAirports } from "react-icons/md";
import toast from "react-hot-toast";
import { Tag } from "antd";
import moment from "moment";
import "../App.css";
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import { Empty } from "antd";

const Interaction = () => {
  const [Questions, SetQuestions] = useState([]);
  const [TotalQuestions, SetTotalQuestions] = useState(0);
  const [loading, setloading] = useState(false);
  const [Keyword, SetKeyword] = useState("");
  const [SkipCount, SetSkipCount] = useState(0); // Use state for SkipCount
  const isInitialMount = useRef(true);
  const [shownproducts, Setshownproducts] = useState(3);
  const [notsearching, Setnotsearching] = useState(false);


  const { Search } = Input;

  async function onSearch(keywordToSearch) {
    try {
      if (keywordToSearch.length === 0) {
        return;
      }
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/Question_search/${keywordToSearch}`
      );
      const data = await response.json();
      if (response.status === 200) {
        SetQuestions(data.questions);
      } else {
        toast("No questions found");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function GetQuestions(SkipCount) {
    try {
      setloading(true);

      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/get_question/${SkipCount}`
      );
      const data = await response.json();
      if (response.status === 200) {
        SetQuestions([...data.questions]);

        setloading(false);
      } else {
        toast.error(data.message);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function GetNumberofQuestion() {
    try {
      const data = await fetch(
        "http://localhost:8000/api/v1/Questions/QuestionCount"
      );

      if (data) {
        const Number = await data.json();
        SetTotalQuestions(Number.Total);
      }
    } catch (error) {
      console.log(error);
    }
  }
 

  useEffect(() => {
    GetQuestions(0);
    GetNumberofQuestion();
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      // Check if it's not the initial render
      if (Keyword.length > 0) {
        Setnotsearching(true);
        onSearch(Keyword);
      } else {
        Setnotsearching(false);
        GetQuestions(0);
      }
    } else {
      isInitialMount.current = false; // Set to false after the initial render
    }
  }, [Keyword]);

  function handleLoadMore(change) {
    const newSkipCount = SkipCount + change;
    if (newSkipCount >= 0) {
      SetSkipCount(newSkipCount);
      GetQuestions(newSkipCount);
      GetNumberofQuestion();
    }
  }

  return (
    <Layout>
      <div
        className="d-flex justify-content-center flex-column align-items-center "
        style={{ gap: "1rem" }}
      >
        <NavLink to="/dashboard/user/Ask">
          <button className="btn btn-info AskQuestion">
            <b>Ask Question</b>{" "}
          </button>
        </NavLink>
        <h1>
          Code
          <MdOutlineConnectingAirports />
          Connect
        </h1>
        <Search
          placeholder="Search Question"
          value={Keyword}
          onChange={(e) => {
            SetKeyword(e.target.value);
          }}
          onSearch={(Keyword) => {
            onSearch(Keyword);
          }}
          enterButton
          className="w-50"
        />
        {Questions.length > 0 ? (
          Questions.map((q) => (
            <div class="card w-75 p-2">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p style={{ marginBottom: "0rem" }}>{q.title} </p>
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    {" "}
                    <div>
                      {" "}
                      {q.tags.map((tag, index) => (
                        <Tag color="blue">{tag}</Tag>
                      ))}
                    </div>
                    <footer class="blockquote-footer">
                      asked by{" "}
                      <cite title="Source Title">
                        <b>{q.user.Name}</b>
                      </cite>{" "}
                      {moment(q.createdAt).fromNow()}
                    </footer>
                  </div>
                </blockquote>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ gap: "1rem" }}
              >
                <NavLink to={`/dashboard/user/answers/${q._id}`}>
                  <button className="btn btn-success">Contribute</button>
                </NavLink>
                <NavLink to={`/dashboard/user/ViewQuestion/${q._id}`}>
                  <button className="btn btn-primary">View Question</button>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <>
            {" "}
            <Empty />
          </>
        )}
        {!notsearching ? (
          shownproducts < TotalQuestions ? (
            <div className="d-flex" style={{ gap: "1rem" }}>
              {SkipCount > 0 ? (
                <button
                  className="mb-2 btn btn-secondary"
                  onClick={() => {
                    Setshownproducts(shownproducts - 3);
                    handleLoadMore(-1);
                  }}
                >
                  {loading ? "Loading..." : "Back"}{" "}
                </button>
              ) : null}
              <button
                className="mb-2 btn btn-primary"
                onClick={() => {
                  Setshownproducts(shownproducts + 3);
                  handleLoadMore(+1);
                }}
              >
                {loading ? "Loading..." : "LoadMore"}{" "}
              </button>
            </div>
          ) : (
            <button
              className="mb-2 btn btn-secondary"
              onClick={() => {
                Setshownproducts(shownproducts - 3);
                handleLoadMore(-1);
              }}
            >
              {loading ? "Loading..." : "Back"}{" "}
            </button>
          )
        ) : null}
      </div>
    </Layout>
  );
};

export default Interaction;
