import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [Address, SetAddress] = useState("");
  const [MobileNo, SetMobileNo] = useState("");
  const navigate = useNavigate();
  const [Loading, SetLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      SetLoading(true);

      if (Password.length < 6) {
        toast.error("Password length must be more than 6");
        SetLoading(false);
        return;
      }
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name,
            Email,
            Password,
            Answer,
            Address,
            MobileNo,
          }),
        }
      );

      if (response.status === 201) {
        SetLoading(false);

        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response.status === 409) {
        // User already exists
        SetLoading(false);
        const data = await response.json();
        toast.error(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      SetLoading(false);
      toast.error(error);
    }
  }
  return (
    <Layout>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="FormBackgound"
      >
        <div className="registerform  ">
          <h1 style={{ margin: "0%" }}>Register</h1>

          <div className="mb-3 wi">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Name"
              aria-describedby="emailHelp"
              value={Name}
              onChange={(e) => {
                SetName(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3 wi">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              aria-describedby="emailHelp"
              value={Email}
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3 wi">
            <div style={{ display: "flex" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                id="exampleInputPassword1"
                value={Password}
                onChange={(e) => {
                  SetPassword(e.target.value);
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

          <div className="mb-3 wi">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={Address}
              onChange={(e) => {
                SetAddress(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 wi">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Mobile Number"
              value={MobileNo}
              onChange={(e) => {
                SetMobileNo(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 wi">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="What is the name of your pet animal ?"
              value={Answer}
              onChange={(e) => {
                SetAnswer(e.target.value);
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark" disabled={Loading}>
            {Loading ? "Loading..." : " Register"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
