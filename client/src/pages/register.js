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

const Register = () => {
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
  
      const response = await fetch("https://talkofcodebackend.onrender.com/api/v1/auth/google-login", {
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
      <div className="Registerpage" >
        <div className="registerleftside" style={{width:"40%"}}>

        </div>
        <div
          className="Registerlayout bg-light" style={{width:"60%"}}
        >
          <div className="d-flex mb-3 gap-2 loginheader">
            <NavLink to="/register" className="w-50 loginreglink">
              {" "}
              Register
            </NavLink>

            <NavLink to="/login" className="w-50 loginreglink">
              {" "}
              Login
            </NavLink>
          </div>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontWeight: "600" }}>Register</h1>
              <p style={{ fontSize: "20px" }}>
                Already have an account? <a href="/login">Login</a> here
              </p>
            </div>

            <div style={{ width: "100%" }}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label smalltitlefont2">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your name"
                  aria-describedby="emailHelp"
                  value={Name}
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                  required
                  style={{ fontSize: "16px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label smalltitlefont2">
                  Email
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

              <div className="mb-3 d-flex">
                <div style={{ width: "50%", marginRight: "10px" }}>
                  <label
                    htmlFor="password"
                    className="form-label smalltitlefont2"
                  >
                    Password
                  </label>
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
                      style={{ fontSize: "16px" }}
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
                <div style={{ width: "50%" }}>
                  <label
                    htmlFor="mobile"
                    className="form-label smalltitlefont2"
                  >
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Mobile Number"
                    value={MobileNo}
                    onChange={(e) => {
                      SetMobileNo(e.target.value);
                    }}
                    required
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div style={{ width: "50%", marginRight: "10px" }}>
                  <label
                    htmlFor="country"
                    className="form-label smalltitlefont2"
                  >
                    Country
                  </label>
                </div>
                <div>
                  <label htmlFor="city" className="form-label smalltitlefont2">
                    City
                  </label>
                </div>
              </div>
              <div className="mb-3 d-flex">
                <div style={{ width: "50%", marginRight: "10px" }}>
                  <CountryDropdown
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                    }}
                    style={{ height: "40px", fontSize: "16px" }}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => {
                      setRegion(val);
                    }}
                    style={{ height: "40px", fontSize: "16px" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="securityQuestion"
                  className="form-label smalltitlefont2"
                >
                  Security Question
                </label>
                <select
                  id="Questions"
                  className="w-100 mb-1"
                  onChange={(e) => {
                    SetSecurityQuestion(e.target.value);
                  }}
                  required
                  style={{ height: "40px", fontSize: "16px" }}
                >
                  <option value="What is your mother's maiden name ?">
                    What is your mother's maiden name?
                  </option>
                  <option value="In which city were you born ?">
                    In which city were you born?
                  </option>
                  <option value="What is the name of your first pet ?">
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
                <label
                  htmlFor="securityAnswer"
                  className="form-label smalltitlefont2"
                >
                  Security Answer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Your Answer"
                  value={Answer}
                  onChange={(e) => {
                    SetAnswer(e.target.value);
                  }}
                  required
                  style={{ fontSize: "16px" }}
                />
              </div>

              <div className="d-flex justify-content-start w-100 border-2">
                <label className="btn border border-3 w-100 btn-outline-primary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      SetPhoto(e.target.files[0]);
                    }}
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary align-items-center"
                  disabled={Loading}
                >
                  {Loading ? "Loading..." : " Register"}
                </button>
              </div>
              <div>
                <h2 className="d-flex justify-content-center mt-3">OR</h2>
              </div>
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
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
