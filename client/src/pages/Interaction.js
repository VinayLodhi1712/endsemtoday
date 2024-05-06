import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/layout/layout";
import { MdOutlineConnectingAirports } from "react-icons/md";
import toast from "react-hot-toast";
import { Tag } from "antd";
import moment from "moment";
import "../App.css";
import { Modal } from "antd";
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
import { Pagination } from "antd";
import chatgpt from "../assests/chatgpt.png";
const Interaction = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [Questions, SetQuestions] = useState([]);
  const [userQuestion, setUserQuestion] = useState([]);
  const [TotalQuestions, SetTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Keyword, SetKeyword] = useState("");
  const [answer, setAnswer] = useState("");

  const isInitialMount = useRef(true);

  const [auth, SetAuth] = useAuth();

  const [pageSize, setPageSize] = useState(6);
  const [Searching, SetSearching] = useState(false);
  const [Page, Setpage] = useState(1);

  const { Search } = Input;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAskQuestion = async () => {
    if (userQuestion.length === 0) return;

    // Add user question to conversation
    const updatedConversation = [
      ...conversation,
      { role: "user", content: userQuestion },
    ];
    setConversation(updatedConversation);
    setUserQuestion("");

    // Fetch answer from ChatGPT
    setLoading(true);
    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "c31e37b590msh53493f64684660cp15092ajsn8c95da3fe0c6",
        "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userQuestion }],
        web_access: false,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      const chatGPTAnswer = result.result;
      // Add chatbot answer to conversation
      updatedConversation.push({ role: "chatbot", content: chatGPTAnswer });
      setConversation(updatedConversation);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (conversation.length > 0) {
      setIsModalVisible(true);
    }
  }, [conversation]);

  async function onSearch(keywordToSearch) {
    try {
      SetSearching(true);
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
  async function GetQuestions() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/get_question/${Page}`
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
        <Button
          variant="contained"
          sx={{ bgcolor: "ochre.darker" }}
          onClick={showModal}
        >
          Clear doubts with AI
        </Button>

        {/* Modal for conversation */}
        <Modal
          title="ChatGPT"
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer={[null]}
        >
          <div className="conversation-container">
            {/* Display conversation */}
            {conversation.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-container">
                  {/* Render icon based on role */}
                  {message.role === "user" ? (
                    <div className="user-icon">
                      <Avatar
                        src={`http://localhost:8000/api/v1/auth/get-userPhoto/${auth.user._id}`}
                        sx={{ width: 30, height: 30 }}
                      />
                    </div>
                  ) : (
                    <div className="chatbot-icon">
                      <Avatar src={chatgpt} sx={{ width: 30, height: 30 }} />
                    </div>
                  )}
                  {/* Render message content */}
                  <div>
                    <div className="message-content">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              className="question-input"
              type="text"
              placeholder="Type your question here..."
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
            />
            <button
              className=" btn btn-dark"
              onClick={handleAskQuestion}
              disabled={loading}
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>
        </Modal>
        <div className="w-100 d-flex flex-column align-items-center gap-3">
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
                      <p
                        className="DateDisplay"
                        style={{ marginLeft: "0.5rem" }}
                      >
                        {" "}
                        {/* Add margin for spacing */}
                        {moment(q.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>
                  </div>

                  <blockquote class="blockquote mb-0">
                    <p
                      style={{ marginBottom: "0rem" }}
                      className="QuestionTitle"
                    >
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
