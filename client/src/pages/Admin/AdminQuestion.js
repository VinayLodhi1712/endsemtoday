import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { Tag } from "antd";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../App.css";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/auth";
import { Tabs } from "antd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminMenu from "./../../components/layout/AdminMenu";

const { TabPane } = Tabs;
const AdminQuestions = () => {
  const [Questions, SetQuestions] = useState([]);
  const [SkipCount, setSkipCount] = useState(0); // State for skip count
  const [TotalQuestions, SetTotalQuestions] = useState(0);
  const [loading, setloading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [BookMarked, setBookMarked] = useState([]);

  async function GetQuestions() {
    try {
      setloading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/UserQuestions/${auth.user._id}/${SkipCount}`
      );
      const data = await response.json();
      if (response.status == 200) {
        SetQuestions((prevQuestions) => [...prevQuestions, ...data.questions]);
        setloading(false);
        setSkipCount(SkipCount + 1);
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
        console.log(TotalQuestions);
      }
    } catch (error) {
      console.log(error);
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
  async function GetBookmarkedQuestion() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/getBookmarked/${auth.user._id}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setBookMarked(data.questions.Bookmarked);
      } else {
        if (response.status === 400) {
          toast.error("Please try Again");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  async function RemoveBookmark(qid) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/removeBookmarked/${auth.user._id}/${qid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Bookmarked removed");
        GetBookmarkedQuestion();
      } else {
        if (response.status === 500) {
          toast.error("Something Went Wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }
  useEffect(() => {
    GetQuestions();
    GetNumberofQuestion();
    GetBookmarkedQuestion();
  }, []);

  const theme = createTheme({
    palette: {
      ochre: {
        danger: "#f90707",
        dangerHover: "rgb(195, 23, 23)",
      },
    },
  });
  const handleLoadMore = () => {
    GetQuestions();
    GetNumberofQuestion();
  };

  return (
    <Layout >
      <div className="bg d-flex justify-content-around">
        <div className="w-25 ">
          <AdminMenu />
        </div>

        <Tabs className="w-50">
          <TabPane tab={<span className="tabtitle">Your Questions</span>} key="1">
            <div className="d-flex w-100 justify-content-around mt-3  ">
              <div
                className="d-flex justify-content-center flex-column align-items-center w-100"
                style={{ gap: "1rem" }}
              >
                {Questions.length > 0 ? (
                  Questions.map((q) => (
                    <div class="card w-100 p-2">
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
                      <div className="d-flex" style={{ gap: "1rem" }}>
                        <NavLink to={`/dashboard/user/answers/${q._id}`}>
                          <Button variant="contained" color="success">
                            Answer
                          </Button>
                        </NavLink>
                        <NavLink to={`/dashboard/user/ViewQuestion/${q._id}`}>
                          <button className="btn btn-primary">View</button>
                        </NavLink>
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
                            className="DangerButton"
                          >
                            Delete
                          </Button>
                        </ThemeProvider>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <h2>You haven't asked any question yet</h2>
                    <NavLink to="/dashboard/user/Ask">
                      <button className="btn btn-info "> Ask Question</button>
                    </NavLink>
                  </div>
                )}
                {Questions.length > 0 ? (
                  SkipCount * 5 < TotalQuestions ? (
                    <button
                      className="mb-2 btn btn-primary"
                      onClick={() => {
                        handleLoadMore();
                      }}
                    >
                      {loading ? "Loading..." : "LoadMore"}{" "}
                    </button>
                  ) : (
                    <h3>No more data</h3>
                  )
                ) : null}
              </div>
            </div>
          </TabPane>

          <TabPane tab={<span className="tabtitle">BookMarked</span>} key="2">
            <div>
              <div
                className="d-flex justify-content-center flex-column align-items-center w-100"
                style={{ gap: "1rem" }}
              >
                {BookMarked.length > 0 ? (
                  BookMarked.map((q) => (
                    <div class="card w-100 p-2">
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
                      <div className="d-flex" style={{ gap: "1rem" }}>
                        <NavLink to={`/dashboard/user/answers/${q._id}`}>
                        <Button variant="contained" color="success">
                            Answer
                          </Button>
                        </NavLink>
                        <NavLink to={`/dashboard/user/ViewQuestion/${q._id}`}>
                          <button className="btn btn-primary">
                            View 
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            RemoveBookmark(q._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <h2>No bookmarks found</h2>
                  </div>
                )}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminQuestions;
