import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth, loginWithGoogle } from "../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "./register.css";
import "react-phone-input-2/lib/style.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Answer, SetAnswer] = useState("");
  const [SecurityQuestion, SetSecurityQuestion] = useState("");
  const [MobileNo, SetMobileNo] = useState("");
  const [photo, SetPhoto] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
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
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card p-4 shadow-lg"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {step === 1 && (
            <div className="step-1">
              <h2 className="text-center mb-3">Create Account</h2>
              <p className="text-center">
                Already have an account? <NavLink to="/login">Login</NavLink>
              </p>

              <button
                className="btn btn-danger w-100 mb-3"
                onClick={handleRegister}
              >
                Sign-in with Google
              </button>

              <hr />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
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
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "#6c757d",
                      }}
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
                className="btn btn-danger w-100 mb-3"
                onClick={handleRegister}
              >
                Sign-in with Google
              </button>

              <hr />
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
                    <option value="What is your favorite book?">
                      What is your favorite book?
                    </option>
                    <option value="What was the model of your first car?">
                      What was the model of your first car?
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
                    {Loading ? "Loading..." : "Register"}
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
