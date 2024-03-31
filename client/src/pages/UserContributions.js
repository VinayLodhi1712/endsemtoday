import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { Card } from "antd";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import UserMEnu from "../components/layout/UserMEnu";
import { NavLink } from "react-router-dom";
import { Modal } from "antd";

const UserContributions = () => {
  const [auth, setAuth] = useAuth();
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the selected contribution ID

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

  async function deleteContribution(aid) {
    try {
      let confirmed = window.confirm(
        "Are you sure you want to delete this contribution?"
      );
      if (confirmed) {
        const del = await fetch(
          `http://localhost:8000/api/v1/Answer/delete_Answer/${aid}`,
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

  useEffect(() => {
    getUserAnswer();
  }, []);

  const handleUpdateClick = (id, answer) => {
    setSelectedId(id); // Set the selected ID when the update button is clicked
    setOpen(true);
    setAnswer(answer);
  };

  return (
    <Layout>
      <div className="w-100 d-flex justify-content-around mt-3">
        <div className="w-25">
          <UserMEnu />
        </div>
        <div className="d-flex flex-column align-items-center mt-2 w-50">
          <h1>Your Contributions</h1>
          <div
            className="w-100 d-flex flex-column mb-3"
            style={{ gap: "1rem" }}
          >
            {response.length > 0 ? (
              response.map((R) => (
                <div key={R._id}>
                  <Card
                    title={R.questionid.title}
                    style={{ width: "100%", border: "2px solid black" }}
                  >
                    <p>{R.answer}</p>
                  </Card>
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-around w-50 ">
                      <button
                        className="btn btn-danger mt-1"
                        onClick={() => deleteContribution(R._id)}
                      >
                        <b>Delete Contribution</b>
                      </button>
                      <button
                        className="btn btn-info mt-1 ml-3"
                        onClick={() => handleUpdateClick(R._id, R.answer)}
                      >
                        <b>Update Contribution</b>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center">
                  You haven't made any Contributions
                </h2>
                <NavLink to="/dashboard/user/interactions">
                  <button className="btn btn-success">Contribute Now</button>
                </NavLink>
              </div>
            )}
          </div>
          <Modal
            title="Enter Updated Answer"
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
