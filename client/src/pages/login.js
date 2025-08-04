// Login.js - Fixed naming conflict and Google login
import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./register.css";
import { getApiUrl, API_ENDPOINTS } from "../config/api";

import app from "../Firebase/Firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuth(); 
  const [Loading, SetLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      SetLoading(true);

      const response = await fetch(
        getApiUrl(API_ENDPOINTS.AUTH.LOGIN),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email, Password }),
        }
      );
      
      const data = await response.json();

      if (response.status === 200) {
        SetLoading(false);
        toast.success("Login Successful");
        
        setAuthState({
          ...authState,
          user: data.user,
          token: data.token,
        });
        
        localStorage.setItem("auth", JSON.stringify({ 
          user: data.user, 
          token: data.token 
        }));

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        SetLoading(false);
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      
      // Add additional scopes for better user info
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      
      // Get display name from multiple sources
      const displayName = user.displayName || user.email?.split('@')[0] || "";
      const photoURL = user.photoURL || "";
  
      const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.GOOGLE_LOGIN), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, displayName, photoURL }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setAuthState({
          ...authState,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
        toast.success(data.message);
        
        // Navigate based on whether it's a new user or existing user
        if (data.isNewUser) {
          // For new users, redirect to welcome page
          navigate("/welcome");
        } else {
          // For existing users, go to home
          navigate("/");
        }
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-in was cancelled");
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Please allow popups for this site and try again");
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-3">Welcome Back</h3>
          <p className="text-center">
            Don't have an account? <NavLink to="/register">Sign-Up</NavLink>
          </p>
          <div className="d-flex justify-content-center mb-3">
            <button 
              className="btn btn-google d-flex align-items-center justify-content-center" 
              style={{ width: '280px' }}
              onClick={handleGoogleAuth}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <div className="google-icon"></div>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
          <div className="text-center mb-3">
            <small className="text-muted">OR</small>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                value={Email} 
                onChange={(e) => SetEmail(e.target.value)} 
                required 
              />
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
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", fontSize: "1.2rem", color: "#6c757d" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100" 
              disabled={Loading}
            >
              {Loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
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



