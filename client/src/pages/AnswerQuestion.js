import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import Button from "@mui/material/Button";
const AnswerQuestion = () => {
  const params = useParams();
  const [Answer, SetAnswer] = useState("");
  const [Title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");
  const [auth, SetAuth] = useAuth();
  const [Email, SetEmail] = useState("");
  async function GetSingleQuestion() {
    try {
      const que = await fetch(
        `http://localhost:8000/api/v1/Questions/getSingleQuestion/${params.id}`
      );
      const data = await que.json();
      if (data) {
        SetTitle(data.question[0].title);
        SetDescription(data.question[0].question);
        SetEmail(data.question[0].user.Email);
      } else {
        toast.error("Error! getting title");
      }
    } catch (error) {
      toast.error("Something Went Wrong");

      console.log(error);
    }
  }
  async function PostAnswer(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Answer/post_Answer/${auth.user._id}/${params.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Answer,
          }),
        }
      );
      const answer = await response.json();
      if (answer) {
        toast.success("Answer Posted Succesfully");
        SetAnswer("");
        await SendEmail();
      } else {
        toast.error("Answer was not posted");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
  async function SendEmail() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Answer/EmailUser/${Email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        console.log("Email sent ");
      }
    } catch (error) {
      toast.error("EmailSent");
    }
  }
  useEffect(() => {
    GetSingleQuestion();
  }, []);

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center ">
        <h1 className="Titlefont mt-2" style={{marginBottom:"-1rem"}}>Contribute</h1>
        <div className="d-flex flex-column contactlayout">
          <h3 className="mediumtitlefont">Question: {Title} ?</h3>
          <p>
            <strong>Description:</strong> {Description}
          </p>
        </div>
        <form
          className="w-100 d-flex flex-column justify-content-center align-items-center"
          onSubmit={(e) => {
            PostAnswer(e);
          }}
        >
          <div className="w-75">
            <b>
              <label
                for="Question"
                className="mediumtitlefont"
                style={{ marginBottom: "1rem" }}
              >
                Answer :{" "}
              </label>
            </b>
            <textarea
              id="Question"
              className="form-control w-100"
              type="text"
              placeholder="Describe your Answer"
              value={Answer}
              required
              onChange={(e) => {
                SetAnswer(e.target.value);
              }}
              style={{ height: "13rem", marginBottom: "1rem" }}
            ></textarea>
          </div>

          <Button
            variant="contained"
            color="success"
            type="submit"
            style={{ padding: "0.5rem 1rem", margin: "0.5rem" }}
          >
            Post Answer
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AnswerQuestion;
