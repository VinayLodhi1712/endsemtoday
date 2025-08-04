import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout/layout";
import { MdOutlineConnectingAirports } from "react-icons/md";
import toast from "react-hot-toast";
import { Tag } from "antd";
import moment from "moment";
import '../../App.css';
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import { Empty } from "antd";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdChatboxes } from "react-icons/io";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useAuth } from "../../context/auth";
import { Pagination } from "antd";
import chatgpt from "../../assests/chatgpt.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import "./Interaction.css";
import ChatGPT from "./Chatgpt"; // Import the ChatGPT component
import { API_BASE_URL } from "../../config/api";

const Interaction = () => {
  const [showChatGPT, setShowChatGPT] = useState(false);
  const [Questions, SetQuestions] = useState([]);
  const [TotalQuestions, SetTotalQuestions] = useState(0);
  const [Keyword, SetKeyword] = useState("");
  const isInitialMount = useRef(true);

  const [auth] = useAuth();

  const [pageSize, setPageSize] = useState(6);
  const [Searching, SetSearching] = useState(false);
  const [Page, Setpage] = useState(1);

  const { Search } = Input;

  // Toggle ChatGPT modal visibility
  const toggleChatGPT = () => {
    setShowChatGPT(!showChatGPT);
  };

  async function onSearch(keywordToSearch) {
    try {
      SetSearching(true);
      if (keywordToSearch.length === 0) {
        return;
      }
      const response = await fetch(
        `${API_BASE_URL}/Questions/Question_search/${keywordToSearch}`
      );
      const data = await response.json();
      if (response.status === 200) {
        SetQuestions(data.questions);
      } else {
        SetSearching(false);
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
          `${API_BASE_URL}/Questions/delete_question/${question}`,
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
  
  async function GetQuestions() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Questions/get_question/${Page}`
      );
      const data = await response.json();
      if (response.status === 200) {
        SetQuestions([...data.questions]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function GetNumberofQuestion() {
    try {
      const data = await fetch(
        "${API_BASE_URL}/Questions/QuestionCount"
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
    if (!isInitialMount.current) {
      // Check if it's not the initial render
      if (Keyword.length > 0) {
        SetSearching(true);
        onSearch(Keyword);
      } else {
        SetSearching(false);
        GetQuestions(0);
      }
    } else {
      isInitialMount.current = false; // Set to false after the initial render
    }
  }, [Keyword]);

  useEffect(() => {
    GetQuestions();
    GetNumberofQuestion();
  }, [Page]);

  return (
    <Layout>
      <div
        className="d-flex flex-column align-items-center"
        style={{ gap: "1rem" }}
      >
        <ThemeProvider theme={theme}>
          <NavLink to="/dashboard/user/Ask">
            <div
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#E0F7FA", // Light blue background
                borderRadius: "50%",
                padding: "15px",
                width: "80px",
                height: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                zIndex: 1000,
              }}
            >
              <FontAwesomeIcon
                icon={faRobot}
                style={{
                  color: "#0000ff", // Slightly darker blue
                  fontSize: "1.8rem",
                  marginBottom: "5px",
                }}
              />
              <span
                style={{
                  color: "#0000ff",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Ask
              </span>
            </div>
          </NavLink>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <div
            style={{
              position: "fixed",
              bottom: "120px",
              right: "20px",
              backgroundColor: "#E0F7FA", // Light blue background
              borderRadius: "50%",
              padding: "15px",
              width: "80px",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={toggleChatGPT} // Add click handler to toggle ChatGPT
          >
            <Avatar
              src={chatgpt}
              style={{
                fontSize: "1.8rem",
                marginBottom: "5px",
              }}
            />

            <span
              style={{
                color: "#0000ff",
                fontSize: "0.7rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              AI-Help
            </span>
          </div>
        </ThemeProvider>

        {/* Include the ChatGPT component */}
        {showChatGPT && <ChatGPT />}

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

        {/* Question Cards Container */}
        <div className="w-100 d-flex flex-column align-items-center gap-3">
          {Questions.length > 0 ? (
            Questions.map((q) => (
              <div key={q._id} className="question-card">
                <div className="question-card-body">
                  <div className="question-header">
                    {/* User image and name */}
                    <div className="user-info">
                      <Avatar
                        src={`${API_BASE_URL}/auth/get-userPhoto/${q.user._id}`}
                        sx={{ width: 32, height: 32 }}
                      />
                      <p className="UserNameDisplay">{q.user.Name}</p>
                    </div>

                    {/* Asked label and date */}
                    <div className="question-date">
                      <div>Asked:</div>
                      <div className="DateDisplay">
                        {moment(q.createdAt).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  </div>

                  <div className="question-content">
                    <p className="QuestionTitle">
                      Q.{" "}
                      {q.title.length > 100
                        ? q.title.substring(0, 100) + "..."
                        : q.title}
                    </p>

                    <div className="question-tags">
                      {q.tags.map((tag, index) => (
                        <Tag color="blue" key={index}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="question-actions">
                  <div className="AnswerParent">
                    <div className="AnswerBox">
                      <IoMdChatboxes />
                      <p style={{ margin: "0rem" }}>{q.AnswerCount} Answers</p>
                    </div>
                  </div>

                  <div className="action-buttons">
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
              <Empty />
            </>
          )}
          {!Searching ? (
            <Pagination
              total={TotalQuestions}
              className="mt-3 mb-3"
              showQuickJumper
              pageSize={pageSize}
              onChange={(value) => {
                Setpage(value);
              }}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Interaction;



