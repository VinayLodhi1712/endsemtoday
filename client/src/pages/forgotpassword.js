import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import forget from "../assests/forget.png";

const Forgotpassword = () => {
  const [Email, SetEmail] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [UserEmail, SetUserEmail] = useState("");
  const [loading, Setloading] = useState(false);
  const [SecurityQuestion, SetSecurityQuestion] = useState("What is your mother's maiden name ?");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
        "https://talkofcodebackend.onrender.com/api/v1/auth/forgetPassword",
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
        toast.error(data.message);
      } else if (response.status === 200) {
        Setloading(false);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      Setloading(false);
      toast.error("Something went wrong, please try again");
    }
  }

  async function SendEmail() {
    try {
      Setloading(true);
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/SendResetEmail",
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
        toast.error("Please try later");
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
      <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                <h3 className="fw-bold">Forgot Password</h3>
                  <p className="text-muted">
                    Remember the Password? <Link to="/login" className="text-decoration-none">Login here</Link>
                  </p>
                  <img src={forget} alt="Forgot Password" className="img-fluid mb-3" style={{ maxWidth: "150px" }} />
                 
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Enter your email"
                      value={Email}
                      onChange={(e) => SetEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="securityQuestion" className="form-label fw-semibold">
                      Security Question
                    </label>
                    <select
                      id="securityQuestion"
                      className="form-select form-select-lg"
                      value={SecurityQuestion}
                      onChange={(e) => SetSecurityQuestion(e.target.value)}
                      required
                    >
                      <option value="What is your mother's maiden name ?">What is your mother's maiden name?</option>
                      <option value="In which city were you born ?">In which city were you born?</option>
                      <option value="What is the name of your first pet ?">What is the name of your first pet?</option>
                      <option value="What is your favorite book?">What is your favorite book?</option>
                      <option value="What was the model of your first car?">What was the model of your first car?</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label fw-semibold">
                      Security Answer
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="answer"
                      placeholder="Answer to security question"
                      value={Answer}
                      onChange={(e) => SetAnswer(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="newPassword" className="form-label fw-semibold">
                      New Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={NewPassword}
                        onChange={(e) => SetNewPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Reset Password"}
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={showModal}
                      disabled={loading}
                    >
                      Reset By Email
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <Link to="/login" className="btn btn-link text-decoration-none">
                      <FaArrowLeft className="me-1" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={<h4 className="mb-0">Reset Password via Email</h4>}
        open={isModalOpen}
        onOk={() => {
          handleOk();
          SendEmail();
        }}
        onCancel={handleCancel}
        okText="Submit"
        okButtonProps={{ disabled: !UserEmail }}
      >
        <p className="text-muted">
          Enter your email and we will send you a link to reset your password
        </p>
        <div className="mb-3">
          <label htmlFor="resetEmail" className="form-label fw-semibold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="resetEmail"
            placeholder="Enter your email"
            value={UserEmail}
            onChange={(e) => SetUserEmail(e.target.value)}
          />
        </div>
      </Modal>
    </Layout> 
  );
};

export default Forgotpassword;