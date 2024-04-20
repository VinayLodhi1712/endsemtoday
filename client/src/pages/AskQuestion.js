import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/auth";
import { Tag } from "antd";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
const AskQuestion = () => {
  const [auth, SetAuth] = useAuth();
  const [question, Setquestion] = useState("");
  const [title, SetTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const handleTagInputChange = (e) => {
    e.preventDefault();
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };
  const handleTagRemove = (e, tagtoremove) => {
    e.preventDefault();
    const updatedItems = tags.filter((item) => item !== tagtoremove);
    setTags(updatedItems);
  };

  async function PostQuestion(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/Questions/ask_question/${auth.user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            question,
            tags,
          }),
        }
      );

      if (response.status === 200) {
        toast.success("Question Posted ");
        SetTitle("");
        Setquestion("");
        setTags("");
      } else {
        toast.error("Question not posted try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  return (
    <Layout>
      {" "}
      <div
        className="d-flex justify-content-center flex-column align-items-center w-100"
        style={{ gap: "1rem", height: "77vh" }}
      >
        <h2 className="mt-2 Titlefont">Ask Your Question</h2>
        <div className="form-container">
          <form
            onSubmit={(e) => {
              PostQuestion(e);
            }}
            className="w-100 d-flex flex-column justify-content-center align-items-center "
            style={{ gap: "1rem" }}
          >
            <div className="w-75">
              <b>
                <label className="form-label " for="Title">
                  Title
                </label>
              </b>
              <input
                id="Title"
                className="form-control w-100"
                type="text"
                placeholder="Give title to your question in one line"
                value={title}
                required
                onChange={(e) => {
                  SetTitle(e.target.value);
                }}
              ></input>
            </div>

            <div className="w-75">
              <b>
                <label className="form-label " for="Question">
                  Body
                </label>
              </b>
              <textarea
                id="Question"
                className="form-control w-100"
                type="text"
                placeholder="Describe your question"
                value={question}
                required
                onChange={(e) => {
                  Setquestion(e.target.value);
                }}
                style={{ height: "10rem" }}
              ></textarea>
            </div>

            <div className="w-50 d-flex flex-column">
              <b>
                <label className="form-label " for="Question">
                  Tags
                </label>
              </b>
              <div className="d-flex" style={{ gap: "2rem" }}>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                  value={tag}
                  placeholder="Enter relevent tag"
                ></input>{" "}
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    handleTagInputChange(e);
                  }}
                >
                  Add
                </button>
              </div>
              <div>
                {tags.length > 0
                  ? tags.map((t) => (
                      <Tag color="blue">
                        {t}
                        <RxCross2
                          onClick={(e) => {
                            handleTagRemove(e, t);
                          }}
                        />
                      </Tag>
                    ))
                  : null}
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Post Question
            </button>
          </form>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default AskQuestion;
