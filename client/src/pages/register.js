import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "./register.css";
import "react-phone-input-2/lib/style.css";
import { getApiUrl, API_ENDPOINTS } from "../config/api";
import app from "../Firebase/Firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Register = () => {
  const [step, setStep] = useState(1);
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [SecurityQuestion, SetSecurityQuestion] = useState("What is your mother's maiden name?");
  const [MobileNo, SetMobileNo] = useState("");
  const [photo, SetPhoto] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [Location, setLocation] = useState("");
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuth();
  const [Loading, SetLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setLocation(region + " " + country);
  }, [region, country]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      SetLoading(true);

      if (Password.length < 6) {
        toast.error("Password length must be more than 6");
        SetLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Email", Email);
      formData.append("Password", Password);
      formData.append("Answer", Answer);
      formData.append("SecurityQuestion", SecurityQuestion);
      formData.append("Location", Location);
      formData.append("photo", photo);
      formData.append("MobileNo", MobileNo);

      const response = await fetch(
        getApiUrl(API_ENDPOINTS.AUTH.REGISTER),
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        SetLoading(false);
        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        SetLoading(false);
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  }
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
          // For new users, show a welcome message and redirect to welcome page
          setTimeout(() => {
            navigate("/welcome");
          }, 1500);
        } else {
          // For existing users, go to home
          navigate("/");
        }
      } else {
        toast.error(data.message || "Google signup failed");
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-up was cancelled");
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Please allow popups for this site and try again");
      } else {
        toast.error("Google signup failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
          {step === 1 && (
            <div className="step-1">
              <h2 className="text-center mb-3">Create Account</h2>
              <p className="text-center">
                Already have an account? <NavLink to="/login">Login</NavLink>
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
                      Signing up...
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

              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={Name}
                    onChange={(e) => SetName(e.target.value)}
                    required
                  />
                </div>

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

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control pe-5"
                      placeholder="Enter password"
                      value={Password}
                      onChange={(e) => SetPassword(e.target.value)}
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

                <div className="mb-3">
                  <label className="form-label">Mobile No.</label>
                  <PhoneInput
                    enableSearch={true}
                    country={"in"}
                    value={MobileNo}
                    onChange={SetMobileNo}
                    inputClass="form-control"
                    containerClass="w-100"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="step-2">
              <h2 className="text-center mb-3">Additional Information</h2>
              <p className="text-center">
                Already have an account? <NavLink to="/login">Login</NavLink>
              </p>
              
              <button
                className="btn btn-danger w-100 mb-3 d-flex align-items-center justify-content-center"
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
                    <i className="fab fa-google me-2"></i>
                    Sign up with Google
                  </>
                )}
              </button>

              <div className="text-center mb-3">
                <small className="text-muted">OR</small>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label">Country</label>
                    <CountryDropdown
                      value={country}
                      onChange={(val) => setCountry(val)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <RegionDropdown
                      country={country}
                      value={region}
                      onChange={(val) => setRegion(val)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Security Question</label>
                  <select
                    className="form-control"
                    value={SecurityQuestion}
                    onChange={(e) => SetSecurityQuestion(e.target.value)}
                    required
                  >
                    <option value="What is your mother's maiden name?">
                      What is your mother's maiden name?
                    </option>
                    <option value="In which city were you born?">
                      In which city were you born?
                    </option>
                    <option value="What is the name of your first pet?">
                      What is the name of your first pet?
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Security Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your answer"
                    value={Answer}
                    onChange={(e) => SetAnswer(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Profile Photo</label>
                  <div className="d-grid">
                    <label className="btn btn-outline-primary">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => SetPhoto(e.target.files[0])}
                        hidden
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={prevStep}
                    style={{ width: "48%" }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary ms-2"
                    disabled={Loading}
                    style={{ width: "48%" }}
                  >
                    {Loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Register;



