import React from "react";
import Layout from "../components/layout/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Modal } from "antd";

const Forgotpassword = () => {
  const [Email, SetEmail] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [UserEmail, SetUserEmail] = useState("");
  const navigate = useNavigate();
  const [loading, Setloading] = useState(false);

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
        className="FormBackgound"
      >
        <div className="registerform ">
          <h1 style={{ fontWeight: "300" }}>Forgot Password</h1>

          <div className="mb-3 wi">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={Email}
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 wi">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Answer
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={Answer}
              placeholder="Answer Of security question?"
              onChange={(e) => {
                SetAnswer(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3 wi">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <div style={{ display: "flex" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                value={NewPassword}
                onChange={(e) => {
                  SetNewPassword(e.target.value);
                }}
                required
              />
              <button
                className="btn"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button type="submit" className="btn btn-dark">
              Reset Password
            </button>

            <button className="btn btn-dark" onClick={showModal}>
              {!loading ? "Reset By Email" : "Sending..."}
            </button>
            <Modal
              title="Enter Email"
              open={isModalOpen}
              onOk={() => {
                handleOk();
                SendEmail();
              }}
              onCancel={handleCancel}
              okText="Submit"
            >
              <input
                type="text"
                className="w-100"
                onChange={(e) => {
                  SetUserEmail(e.target.value);
                }}
                value={UserEmail}
              ></input>
            </Modal>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Forgotpassword;
