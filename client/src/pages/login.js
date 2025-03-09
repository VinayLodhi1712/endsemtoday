import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink} from "react-router-dom";
import { useAuth, loginWithGoogle } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./register.css";
//import googlelogo from "../assets/google-logo.svg"
const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [Loading, SetLoading] = useState(false);

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
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-3">Welcome Back</h3>
          <p className="text-center">Don’t have an account? <NavLink to="/register">Sign-Up</NavLink></p>
          <button className="btn btn-danger w-100 mb-3" onClick={handleRegister}>Login with Google</button>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" value={Email} onChange={(e) => SetEmail(e.target.value)} required />
            </div>
            <div className="mb-3 position-relative">
      <label className="form-label">Password</label>
      <div className="position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control pe-5"
          placeholder="Enter password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
          style={{ cursor: "pointer", fontSize: "1.2rem", color: "#6c757d" }}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
            <button type="submit" className="btn btn-primary w-100" disabled={Loading}>{Loading ? "Loading..." : "Login"}</button>
            <p className="text-center mt-3">
              <NavLink to="/ForgotPassword">Forgot Password?</NavLink>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
