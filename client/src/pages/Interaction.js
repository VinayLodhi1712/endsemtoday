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
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdChatboxes } from "react-icons/io";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useAuth } from "../context/auth";
const Interaction = () => {
  const [Questions, SetQuestions] = useState([]);
  const [TotalQuestions, SetTotalQuestions] = useState(0);
  const [loading, setloading] = useState(false);
  const [Keyword, SetKeyword] = useState("");
  const [SkipCount, SetSkipCount] = useState(0); // Use state for SkipCount
  const isInitialMount = useRef(true);
  const [shownproducts, Setshownproducts] = useState(3);
  const [notsearching, Setnotsearching] = useState(false);
  const [auth, SetAuth] = useAuth();

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
  async function DeleteQuestion(question) {
    try {
      let confirmed = window.confirm(
        "Are you sure you want to delete this Question?"
      );
      if (confirmed) {
        const del = await fetch(
          `http://localhost:8000/api/v1/Questions/delete_question/${question}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (del) {
          toast.success("Deleted Successfully");
          window.location.reload();
        } else {
          toast.error("Error! Please Try Again");
        }
      } else {
        return;
      }
    } catch (error) {
      toast.error("Question Not Deleted");
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

  const theme = createTheme({
    palette: {
      ochre: {
        darker: blue[900],
        danger: "#f90707",
        dangerHover: "rgb(195, 23, 23)",
      },
    },
  });
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
        className="d-flex flex-column align-items-center BgColor"
        style={{ gap: "1rem", height: "100vh" }}
      >
        {" "}
        <ThemeProvider theme={theme}>
          <NavLink to="/dashboard/user/Ask" className="AskQuestion">
            <Button variant="contained" sx={{ bgcolor: "ochre.darker" }}>
              Ask Question
            </Button>
          </NavLink>
        </ThemeProvider>
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
            <div
              class="card w-75 p-2"
              style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)" }}
            >
              <div class="card-body">
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "100%" }}
                >
                  {/* User image and name */}
                  <div
                    className="d-flex align-items-center "
                    style={{ width: "50%" }}
                  >
                    <Avatar
                      src={`http://localhost:8000/api/v1/auth/get-userPhoto/${q.user._id}`}
                      sx={{ width: 30, height: 30 }} // Add margin for spacing
                    />
                    <p className="UserNameDisplay">{q.user.Name}</p>
                  </div>

                  {/* Asked label and date */}
                  <div
                    className="d-flex align-items-center"
                    style={{ width: "50%" }}
                  >
                    <p className="light-dull">Asked:</p>
                    <p className="DateDisplay" style={{ marginLeft: "0.5rem" }}>
                      {" "}
                      {/* Add margin for spacing */}
                      {moment(q.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                </div>

                <blockquote class="blockquote mb-0">
                  <p style={{ marginBottom: "0rem" }} className="QuestionTitle">
                    {q.title.length > 100
                      ? q.title.substring(0, 100) + "..."
                      : q.title}
                  </p>

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
              <div className="d-flex justify-content-between">
                <div className="AnswerParent">
                  <div className="AnswerBox">
                    <IoMdChatboxes />
                    <p style={{ margin: "0rem" }}>{q.AnswerCount} Answers</p>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <NavLink to={`/dashboard/user/ViewQuestion/${q._id}`}>
                    <button className="btn btn-primary">View</button>
                  </NavLink>
                  <NavLink to={`/dashboard/user/answers/${q._id}`}>
                    <Button variant="contained" color="success">
                      Answer
                    </Button>
                  </NavLink>
                  {auth.user.Role == 1 ? (
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "ochre.danger",
                          "&:hover": {
                            bgcolor: "ochre.dangerHover",
                          },
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          DeleteQuestion(q._id);
                        }}
                      >
                        Delete
                      </Button>
                    </ThemeProvider>
                  ) : null}
                </div>
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
                  {loading ? "Loading..." : "Back"}
                </button>
              ) : null}
              <button
                className="mb-2 btn btn-primary"
                onClick={() => {
                  Setshownproducts(shownproducts + 3);
                  handleLoadMore(+1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          ) : shownproducts > 3 ? (
            <button
              className="mb-2 btn btn-secondary"
              onClick={() => {
                Setshownproducts(shownproducts - 3);
                handleLoadMore(-1);
              }}
            >
              {loading ? "Loading..." : "Back"}
            </button>
          ) : null
        ) : null}
      </div>
    </Layout>
  );
};

export default Interaction;
