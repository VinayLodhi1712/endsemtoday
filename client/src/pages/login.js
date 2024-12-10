import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuth, loginWithGoogle } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import loginimg from "../assests/login.png";
import "./register.css";
//import googlelogo from "../assets/google-logo.svg"
const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [Loading, SetLoading] = useState(false);
  const location = useLocation();

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      SetLoading(true);
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email,
            Password,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 404) {
        //user not registered
        SetLoading(false);
        toast.error(data.message);
      } else {
        if (response.status === 210) {
          // Invalid Password
          SetLoading(false);
          toast.error(data.message);
        } else {
          if (response.status === 200) {
            SetLoading(false);
            //login successful
            toast.success("Login Succesful");
            setAuth({
              ...auth, //spread auth to keep previous values as it is
              user: data.user,
              token: data.token,
            });
            localStorage.setItem(
              "auth",
              JSON.stringify({ user: data.user, token: data.token })
            );

            setTimeout(() => {
              navigate("/");
            }, 2500);
          }
        }
      }
    } catch (error) {
      SetLoading(false);
      console.log(error);
      toast.error("Something went wrong try again");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      console.log(user);

      const response = await fetch(
        "http://localhost:8000/api/v1/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            Name: user.displayName,
            photo: user.photoURL,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );

        console.log(data.isNewUser);
        toast.success("Login Successful");
        if (data.isNewUser) {
          navigate("/dashboard/user/Profile");
        } else {
          navigate("/");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="registercontainer">
        <div className="Registerpage">
          <div className="registerleftside d-none d-md-block">
            <div className="registerbrandname">
              <NavLink to="/" className="navbar-brand" href="#">
                TALKOFCODE
              </NavLink>
            </div>
            <div className="registerleftsidetopic">
              <div>
                <h2 className="textshadow">Logged in Form</h2>
                <NavLink to="/register" className="nav-link">
                  <span>Sign-up</span>
                </NavLink>

                <NavLink to="/login" className="nav-link">
                  <span>Login</span>
                </NavLink>

                <button
                  type="submit"
                  className="btn mt-2 marginleft20rem btn-outline-primary"
                  onClick={handleRegister}
                  style={{ width: "10rem" }}
                >
                  Login with Google
                </button>
              </div>
            </div>
          </div>
          <div className="loginrightside bg-light">
            <form
              className="register-form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="mt-2" style={{ width: "100%" }}>
                <div className="form-title">
                  <h1 className=" text-center" style={{ fontWeight: "600" }}>
                    Welcome Back
                  </h1>
                  <p className="subtitle text-center">
                    Doesn't have an account yet? <a href="/register">Sign-Up</a>{" "}
                    here
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary google-btn"
                  onClick={handleRegister}
                >
                  Login with Google
                </button>

                <h3 className="or-divider">OR</h3>

                <div className="mb-2">
                  <label htmlFor="email" className="form-label smalltitlefont2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={(e) => SetEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="form-label smalltitlefont2"
                  >
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control pe-5"
                      placeholder="Password"
                      value={Password}
                      onChange={(e) => SetPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="btn position-absolute end-0 top-50 translate-middle-y"
                      style={{ border: "none" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={Loading}
                  >
                    {Loading ? "Loading..." : "Login"}
                  </button>
                </div>

                <p className="already-account">
                  <NavLink to="/ForgotPassword">Forgot Password</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
