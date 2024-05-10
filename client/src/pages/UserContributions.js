import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { Card } from "antd";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import UserMEnu from "../components/layout/UserMEnu";
import { NavLink } from "react-router-dom";
import { Modal } from "antd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";

const UserContributions = () => {
  const [auth, setAuth] = useAuth();
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the selected contribution ID
  const [expandedId, setExpandedId] = useState(null);
  async function getUserAnswer() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Answer/Get_User_Answers/${auth.user._id}`
      );
      const answers = await response.json();
      if (answers) {
        setResponse(answers.answers);
      } else {
        toast("you haven't made any contributions");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function deleteContribution(aid, qid) {
    try {
      let confirmed = window.confirm(
        "Are you sure you want to delete this contribution?"
      );
      if (confirmed) {
        const del = await fetch(
          `http://localhost:8000/api/v1/Answer/delete_Answer/${aid}/${qid}/${auth.user._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (del.status === 200) {
          toast.success("Deleted Successfully");
          getUserAnswer();
        } else {
          toast.error("Try Again");
        }
      } else {
        return;
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function updateContribution(aid) {
    try {
      const updated = await fetch(
        `http://localhost:8000/api/v1/Answer/Update_Answer/${aid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer,
          }),
        }
      );
      if (updated.status === 201) {
        toast.success("Answer Updated ");
        setOpen(false);
        getUserAnswer();
      } else {
        toast.error("Try Again");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  const theme = createTheme({
    palette: {
      ochre: {
        danger: "#f90707",
        dangerHover: "rgb(195, 23, 23)",
        Update: blue[900],
        UpdateHover: "#05a8a8",
      },
    },
  });

  useEffect(() => {
    getUserAnswer();
  }, []);

  const handleUpdateClick = (id, answer) => {
    setSelectedId(id); // Set the selected ID when the update button is clicked
    setOpen(true);
    setAnswer(answer);
  };

  const handleSeeMore = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <div className="bg w-100 d-flex justify-content-around ">
        <div className="w-25">
          <UserMEnu />
        </div>
        <div className="d-flex flex-column align-items-center w-50">
          <h1>Your Contributions</h1>
          <div className="w-100 d-flex flex-column" style={{ gap: "1rem" }}>
            {response.length > 0 ? (
              response.map((R) => (
                <div key={R._id}>
                  <Card
                    title={
                      <span className="smalltitlefont3 bullet-circle">
                        &#8226; {R.questionid.title}
                      </span>
                    }
                    style={{
                      width: "100%",
                      border: "2px solid black",
                      paddingBottom: "0px",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                    ></div>
                    <p
                      className="arrow-bullet ff"
                      style={{
                        fontSize: "18px",
                        marginTop: "-2rem",
                        flex: "1",
                      }}
                    >
                      &rarr;{" "}
                      {expandedId === R._id
                        ? R.answer
                        : `${R.answer.slice(0, 47)}...`}
                      {R.answer.length > 50 && (
                        <button
                          type="link"
                          onClick={() => handleSeeMore(R._id)}
                          style={{ marginLeft: "5px" }}
                        >
                          {expandedId === R._id ? "See less" : "See more"}
                        </button>
                      )}
                    </p>
                  </Card>
                  <div
                    className="d-flex justify-content-center mt-1"
                    style={{ width: "63%" }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "ochre.Update",
                          marginLeft: "12rem",
                          marginRight: "1rem",
                        }}
                        onClick={() => handleUpdateClick(R._id, R.answer)}
                      >
                        Update
                      </Button>
                    </ThemeProvider>
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
                        onClick={() =>
                          deleteContribution(R._id, R.questionid._id)
                        }
                      >
                        Delete
                      </Button>
                    </ThemeProvider>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center">
                  You haven't made any Contributions
                </h2>
                <NavLink to="/dashboard/user/interaction">
                  <Button variant="contained" color="success">
                    Answer
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
          <Modal
            title={<h2 className="modaltitle ff">Enter Updated Answer</h2>}
            centered
            visible={open}
            onOk={() => updateContribution(selectedId)} // Pass the selected ID to the update function
            onCancel={() => setOpen(false)}
            width={1000}
          >
            <textarea
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              rows="4"
              cols="140"
            ></textarea>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default UserContributions;
