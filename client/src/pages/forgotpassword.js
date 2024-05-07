import React from "react";
import Layout from "../components/layout/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import forget from "../assests/forget.png"

const Forgotpassword = () => {
  const [Email, SetEmail] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [UserEmail, SetUserEmail] = useState("");
  const navigate = useNavigate();
  const [loading, Setloading] = useState(false);
  const [SecurityQuestion, SetSecurityQuestion] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      Setloading(true);
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/forgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email,
            NewPassword,
            Answer,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 404) {
        Setloading(false);
        //User Not Found Invalid Email Or Answer
        toast.error(data.message);
      } else if (response.status === 200) {
        Setloading(false);
        //Password reset Succesfull
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      Setloading(false);
      toast.error("Something went wrong try again");
    }
  }
  async function SendEmail() {
    try {
      Setloading(true);
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/SendResetEmail",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            UserEmail,
          }),
        }
      );
      if (response.status === 200) {
        Setloading(false);
        toast.success("Check Your Email");
        SetUserEmail("");
      } else {
        Setloading(false);
        toast.success("please try later");
        SetUserEmail("");
      }
    } catch (error) {
      toast.error("Error");
      Setloading(false);
      SetUserEmail("");
    }
  }
  return (
    <Layout>
      <div className="bg">
        <div className="Registerlayout bg-light" style={{ width: "70%", padding: "20px", borderRadius: "10px" }}>
          <div className="d-flex mb-2"></div>


          <form
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}

          >
            <img src={forget}></img>
            <div className="mt-1" style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontWeight: "600" }}>Forgot Password</h3>
                <p style={{ fontSize: "20px" }}>Remember the Password..? Go to <a href="/login">Login</a> here</p>
              </div>
            </div>


            <div className="mb-2 w-75" style={{ marginLeft: "3rem" }}>
              <label htmlFor="exampleInputEmail1" className="form-label smalltitlefont2">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={Email}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-3 w-75" style={{ marginLeft: "3rem" }}>
              <label htmlFor="securityQuestion" className="form-label smalltitlefont2">
                Security Question
              </label>
              <select
                id="Questions"
                className="w-100 mb-1"
                onChange={(e) => {
                  SetSecurityQuestion(e.target.value);
                }}
                required
                style={{ height: '40px', fontSize: "16px" }}
              >
                <option value="What is your mother's maiden name ?">
                  What is your mother's maiden name?
                </option>
                <option value="In which city were you born ?">
                  In which city were you born?
                </option>
                <option value="What is the name of your first pet ?">
                  What is the name of your first pet?
                </option>
                <option value="What is your favorite book?">
                  What is your favorite book?
                </option>
                <option value="What was the model of your first car?">
                  What was the model of your first car?
                </option>
              </select>
            </div>

            <div className="mb-3" style={{ width: "75%", marginLeft: "3rem" }}>
              <label htmlFor="exampleInputEmail1" className="form- smalltitlefont2">
                Security Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={Answer}
                placeholder="Answer Of security question"
                onChange={(e) => {
                  SetAnswer(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-3" style={{ width: "75%", marginLeft: "3rem" }}>
              <label htmlFor="exampleInputPassword1" className="form-label smalltitlefont2">
                New Password
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter New Password"
                  value={NewPassword}
                  onChange={(e) => {
                    SetNewPassword(e.target.value);
                  }}
                  required
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{ marginLeft: "5px" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div
              className="mt-3"
              style={{
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginLeft: "6rem"
              }}
            >
              <button type="submit" className="btn btn-primary" style={{ width: "10rem", marginRight: "6rem" }}>
                Reset Password
              </button>

              <button className="btn btn-primary" onClick={showModal}>
                {!loading ? "Reset By Email" : "Sending..."}
              </button>
              <Modal
                title={<h2 style={{ fontWeight: "500", textAlign: "center", display: "block" }}>Reset Password via Email</h2>}

                open={isModalOpen}
                onOk={() => {
                  handleOk();
                  SendEmail();
                }}
                onCancel={handleCancel}
                okText="Submit"
              >
                <p style={{ width: "75%", textAlign: "center", display: "block", fontSize: "15px", marginLeft: "4rem", color:"red" }}>Enter your email and we will send you a link to reset your password</p>
                <label htmlFor="exampleInputEmail1" className="form-label smalltitlefont2">
                  Email address
                </label>

                <input
                  type="text"
                  className="w-100 form-control"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    SetUserEmail(e.target.value);
                  }}
                  value={UserEmail}
                ></input>
              </Modal>
            </div>
            <Link to="/login" className="mt-3 btn btn-outline-primary d-flex align-items-center text-decoration-none">
              <FaArrowLeft className="me-1" />
              Back to Login
            </Link>

          </form>
        </div>
      </div>

    </Layout>
  );
};

export default Forgotpassword;
