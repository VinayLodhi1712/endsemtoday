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
  async function GetSingleQuestion() {
    try {
      const que = await fetch(
        `http://localhost:8000/api/v1/Questions/getSingleQuestion/${params.id}`
      );
      const data = await que.json();
      if (data) {
        SetTitle(data.question[0].title);
        SetDescription(data.question[0].question);
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
      } else {
        toast.error("Answer was not posted");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  useEffect(() => {
    GetSingleQuestion();
  }, []);

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center mt-2">
        <h1>Contribute</h1>
        <div className="d-flex flex-column w-50">
          <h3>Question: {Title} ?</h3>
          <p>Description: {Description}</p>
        </div>
        <form
          className="w-100 d-flex flex-column justify-content-center align-items-center"
          onSubmit={(e) => {
            PostAnswer(e);
          }}
        >
          <div className="w-50">
            <b>
              <label for="Question">Body</label>
            </b>
            <textarea
              id="Question"
              className="w-100"
              type="text"
              placeholder="Describe your Answer"
              value={Answer}
              required
              onChange={(e) => {
                SetAnswer(e.target.value);
              }}
              style={{ height: "13rem" }}
            ></textarea>
          </div>

          <Button variant="contained" color="success" type="submit">
            Post
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AnswerQuestion;
