import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
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
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
          Password,
        }),
      });
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
      console.log(error)
      toast.error("Something went wrong try again");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="bg">
        <div className="Registerlayout bg-light" style={{ width: "70%", padding: "20px", borderRadius: "10px" }}>
          <div className="d-flex mb-3">
            <button
              className={`align-items-center button-16 ${location.pathname === '/register' ? 'bg-primary' : ''}`}
              style={{ width: "50%", height: "50px", borderRadius: "5px", padding: "10px 20px", backgroundColor:"grey"}}
            >
              <NavLink
                to="/register"
                className={`nav-link ${location.pathname === '/register' ? 'active-button' : ''}`}
                style={{ height: "100%", fontSize: "28px", textDecoration: "none" }}
              >
                Register
              </NavLink>
            </button>
            <button
              className={`align-items-center button-16 ${location.pathname === '/login' ? 'bg-primary' : ''}`}
              style={{ width: "50%", height: "50px", fontSize: "20px", borderRadius: "5px" }}
            >
              <NavLink
                to="/login"
                className={`nav-link ${location.pathname === '/login' ? 'active-button' : ''}`}
                style={{ height: "100%", fontSize: "28px", textDecoration: "none", padding: "10px 20px" }}
              >
                Login
              </NavLink>
            </button>
          </div>
          


          <form
            style={{ display: "flex", justifyContent: "center" }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mt-2" style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <h1 style={{ fontWeight: "600" }}>Login</h1>
                <p style={{ fontSize: "20px" }}>Doesn't have an account yet? <a href="/register">Sign-Up</a> here</p>
              </div>


              <div className="mb-2 w-75" style={{ marginLeft: "5rem" }}>
                <label htmlFor="exampleInputEmail1" className="form-label smalltitlefont2">
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
                  style={{ fontSize: "16px" }}
                />
              </div>

              <div className="mb-3" style={{ width: "75%", marginLeft: "5rem" }}>
                <label htmlFor="exampleInputPassword1" className="form-label smalltitlefont2">
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
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "60%",
                  marginLeft: "8rem"
                }}
              >
                <button type="submit" className="btn btn-primary" disabled={Loading} style={{ width: "10rem" }}>
                  {Loading ? "Loading..." : "Login"}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/ForgotPassword");
                  }}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>


  );
};

export default Login;
