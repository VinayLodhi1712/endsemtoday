import React, { useState, useSyncExternalStore } from "react";
import Layout from "../components/layout/layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const Resetpasswordemail = () => {
  const [NewPass, SetNewPass] = useState("");
  const [NewPassAgain, SetNewPassAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();
  const Email = params.email;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function ResetPassword() {
    try {
      if (NewPass === NewPassAgain) {
        const response = await fetch(
          `https://talkofcodebackend.onrender.com/api/v1/auth/DirectReset/${Email}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              NewPassword: NewPass,
            }),
          }
        );
        if (response.status === 200) {
          toast.success("Password Reset Complete");
        } else if (response.status === 500) {
          toast.error("Error Please try later");
        }
      } else {
        toast("password do not match");
      }
    } catch (error) {
      toast.error("Error in api");
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
          ResetPassword(e);
        }}
        className="FormBackgound"
      >
        <div className="registerform ">
          <div className="d-flex align-items-center justify-content-center">
            <h1 style={{ fontWeight: "300" }}>Reset Password </h1>{" "}
            <button
              className="btn"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-3 wi">
            <label htmlFor="exampleInputEmail1" className="form-label">
              New Password:{" "}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => {
                SetNewPass(e.target.value);
              }}
              value={NewPass}
            />
          </div>

          <div className="mb-3 wi">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter New Password Again:{" "}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => {
                SetNewPassAgain(e.target.value);
              }}
              value={NewPassAgain}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Reset
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Resetpasswordemail;
