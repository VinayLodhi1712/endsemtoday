import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth, loginWithGoogle } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import signup from "../assests/singup.png";
const Register = () => {
  const [step, setStep] = useState(1);
  const Locate = useLocation();
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [SecurityQuestion, SetSecurityQuestion] = useState("");
  const [MobileNo, SetMobileNo] = useState("");
  const [photo, SetPhoto] = useState("");
  const [country, setCountry] = useState(""); // Added country state
  const [region, setRegion] = useState(""); // Added region state
  const [Location, setLocation] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [Loading, SetLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const Setlocation = () => {
    setLocation(region + " " + country);
  };

  useEffect(() => {
    Setlocation();
  }, [region]);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Email", Email);
      formData.append("Password", Password);
      formData.append("Answer", Answer);
      formData.append("SecurityQuestion", SecurityQuestion);
      formData.append("Location", Location);
      formData.append("photo", photo);
      formData.append("MobileNo", MobileNo);
      if (Password.length < 6) {
        toast.error("Password length must be more than 6");
        SetLoading(false);
        return;
      }
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        SetLoading(false);

        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 409) {
        // User already exists
        SetLoading(false);
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      SetLoading(false);
      toast.error(error.message);
    }
  }

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
          photo: user.photoURL,
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
      <div className="registercontainer">
        <div className="Registerpage" >
          <div className="registerleftside d-none d-md-block">
            <div className="registerbrandname" >
              <NavLink to="/" className="navbar-brand" href="#">
                TALKOFCODE
              </NavLink>
            </div>
            <div className="registerleftsidetopic">
              <div>
                <img src={signup}></img>
                <h2 className="textshadow">New User Registeration</h2>
                <NavLink to="/register" className="nav-link">
                  <span>Sign-up</span>
                </NavLink>

                <NavLink to="/login" className="nav-link">
                  <span>Login</span>
                </NavLink>

                <button
                  type="submit"
                  className="btn mt-2 marginleft20rem btn-outline-primary"
                  onClick={
                    handleRegister
                  }
                  style={{ width: "10rem" }}
                >
                  Sign-in with Google
                </button>
              </div>
            </div>
          </div>
          <div className="registerrightside bg-light">
            <form className="register-form" onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="step-1">
                  <div className="form-title">
                    <h1 className="textshadow2 text-center">Create Account</h1>
                    <p className="subtitle text-center">Let's get started</p>
                  </div>

                  <button className="btn btn-outline-primary google-btn" onClick={handleSubmit}>
                    Sign-in with Google
                  </button>

                  {/* OR divider with horizontal lines */}
                  <h3 className="or-divider">OR</h3>

                  {/* Name */}
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label smalltitlefont2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={Name}
                      onChange={(e) => SetName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
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

                  {/* Password */}
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label smalltitlefont2">
                      Password
                    </label>
                    <div className="password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={Password}
                        onChange={(e) => SetPassword(e.target.value)}
                        required
                      />
                      <button className="btn btn-outline-primary" type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="mb-2">
                    <label htmlFor="mobile" className="form-label smalltitlefont2">
                      Mobile No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Mobile Number"
                      value={MobileNo}
                      onChange={(e) => SetMobileNo(e.target.value)}
                      required
                    />
                  </div>

                  {/* Continue to Step 2 Button */}
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={nextStep}>
                      Continue to Step 2 →
                    </button>
                  </div>

                  {/* Already have an account */}
                  <p className="already-account">
                    Already have an account? <NavLink to="/login">Login</NavLink>
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="step-2">
                  <div className="form-title">
                    <h1 className="textshadow2 text-center">Step 2: Additional Information</h1>
                  </div>

                  {/* Country and City */}
                  <div className="mb-2 d-flex">
                    <div className="half-width">
                      <label htmlFor="country" className="form-label smalltitlefont2">
                        Country
                      </label>
                      <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        className="form-control"
                      />
                    </div>
                    <div className="half-width">
                      <label htmlFor="city" className="form-label smalltitlefont2">
                        City
                      </label>
                      <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => setRegion(val)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Security Question */}
                  <div className="mb-2">
                    <label htmlFor="securityQuestion" className="form-label smalltitlefont2">
                      Security Question
                    </label>
                    <select
                      id="Questions"
                      className="form-control"
                      onChange={(e) => SetSecurityQuestion(e.target.value)}
                      required
                    >
                      <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                      <option value="In which city were you born?">In which city were you born?</option>
                      <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                      <option value="What is your favorite book?">What is your favorite book?</option>
                      <option value="What was the model of your first car?">What was the model of your first car?</option>
                    </select>
                  </div>

                  {/* Security Answer */}
                  <div className="mb-2">
                    <label htmlFor="securityAnswer" className="form-label smalltitlefont2">
                      Security Answer
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Answer"
                      value={Answer}
                      onChange={(e) => SetAnswer(e.target.value)}
                      required
                    />
                  </div>

                  {/* Upload Photo */}
                  <div className="d-flex justify-content-start w-100 border-2 mb-2">
                    <label className="btn border border-3 w-100 btn-outline-primary">
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

                  {/* Back and Register Buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-secondary" onClick={prevStep}>
                      ← Back to Step 1
                    </button>
                    <button className="btn btn-primary" type="submit">
                      {Loading ? "Loading..." : "Register"}
                    </button>
                  </div>

                  {/* Already have an account */}
                  <p className="already-account">
                    Already have an account? <NavLink to="/login">Login</NavLink>
                  </p>
                </div>
              )}
            </form>
          </div>


        </div>
      </div>
    </Layout >
  );
};

export default Register;
