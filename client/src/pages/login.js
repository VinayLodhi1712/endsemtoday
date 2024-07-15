import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuth, loginWithGoogle } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
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
  
      const response = await fetch("http://localhost:8000/api/v1/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          Name: user.displayName,
          photo:user.photoURL,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
  
        localStorage.setItem("auth", JSON.stringify({
          user: data.user,
          token: data.token,
        }));
  
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
      <div >
        <div
          className="loginlayout bg-light"
        >
          <div className="d-flex mb-3 gap2">
            <NavLink to="/register" className="loginreglink"  >
              {" "}
              Register
            </NavLink>

            <NavLink to="/login" className="loginreglink" >
              {" "}
              Login
            </NavLink>
          </div>

          <form
            style={{ display: "flex", justifyContent: "center" }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mt-2" style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <h1 style={{ fontWeight: "600", color: "rgb(208, 50, 50)" }}>Welcome Back</h1>
                <p style={{ fontSize: "20px", color: "rgb(208, 50, 50)" }}>
                  Doesn't have an account yet? <a href="/register">Sign-Up</a>{" "}
                  here
                </p>
              </div>

              <div className="mb-2 w-75 inputmargin">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label smalltitlefont2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  aria-describedby="emailHelp"
                  value={Email}
                  onChange={(e) => {
                    SetEmail(e.target.value);
                  }}
                  required
                  style={{ fontSize: "16px", backgroundColor: "#E6E6FA" }}
                />
              </div>

              <div
                className="mb-3 inputmargin"
                style={{ width: "75%"}}
              >
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label smalltitlefont2"
                >
                  Password
                </label>
                <div style={{ display: "flex" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Password"
                    value={Password}
                    onChange={(e) => {
                      SetPassword(e.target.value);
                    }}
                    required
                    style={{ fontSize: "16px", backgroundColor: "#E6E6FA" }}
                  />
                  <button
                    className="btn"
                    style={{ fontSize: "16px", backgroundColor: "#E6E6FA", marginLeft: "5px" }}
                    type="button"
                    onClick={togglePasswordVisibility}

                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mt-3 loginbuttons">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={Loading}
                  style={{ width: "10rem", backgroundColor: "rgb(208, 50, 50)" }}
                >
                  {Loading ? "Loading..." : "Login"}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/ForgotPassword");
                  }}
                  style={{ width: "10rem", backgroundColor: "rgb(208, 50, 50)" }}
                >
                  Forgot Password
                </button>

              </div>
              <div>
                <h2 className="d-flex justify-content-center mt-4">OR</h2>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2 logingooglebutton"
                onClick={
                  handleRegister
                }
                style={{ width: "10rem", backgroundColor: "rgb(208, 50, 50)" }}
              >
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
