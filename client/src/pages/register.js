import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, NavLink , useLocation} from "react-router-dom";
import toast from "react-hot-toast";
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
  const [Loading, SetLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const Setlocation = () => {
    setLocation(country + " " + region);
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
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          body: formData,
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
      }
    } catch (error) {
      SetLoading(false);
      toast.error(error.message);
    }
  }
  return (
    <Layout>
      <div className="bg">
        <div className="Registerlayout bg-light" style={{ width: "70%", height: "100%", padding: "20px", borderRadius: "10px" }}>
          <div className="d-flex mb-3">
            <button
              className="align-items-center button-16 bg-primary"
              style={{ width: "50%", height: "50px", borderRadius: "5px", padding: "10px 20px" }}
            >
              <NavLink
                to="/register"
                className="nav-link"
               
                style={{ height: "100%", fontSize: "28px", textDecoration: "none" }}
              >
                Register
              </NavLink>
            </button>
            <button
              className="align-items-center button-16 "
              style={{ width: "50%", height: "50px", fontSize: "20px", borderRadius: "5px",backgroundColor:"gray" }}
            >
              <NavLink
                to="/login"
                className={`nav-link ${Locate.pathname === '/login' ? 'active-button' : ''}`}
                
                style={{ height: "100%", fontSize: "28px", textDecoration: "none", padding: "10px 20px",  }}
              >
                Login
              </NavLink>
            </button>
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
              <p style={{ fontSize: "20px" }}>Already have an account? <a href="/login">Login</a> here</p>
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
                  <label htmlFor="password" className="form-label smalltitlefont2">
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
                  <label htmlFor="mobile" className="form-label smalltitlefont2">
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
                  <label htmlFor="country" className="form-label smalltitlefont2">
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
                    style={{ height: '40px', fontSize: "16px" }}
                  />
                </div>
                <div style={{ width: "50%" }}>

                  <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => {
                      setRegion(val);
                    }}
                    style={{ height: '40px', fontSize: "16px" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="securityQuestion" className="form-label smalltitlefont2">
                  Security Question
                </label>
                <select
                  id="Questions"
                  className="w-100 mb-1"
                  onChange={(e) => {
                    SetSecurityQuestion(e.target.value);
                  }}
                  required
                  style={{ height: '40px', fontSize: "16px" }}
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
                <label htmlFor="securityAnswer" className="form-label smalltitlefont2">
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
                <button type="submit" className="btn btn-primary align-items-center" disabled={Loading}>
                  {Loading ? "Loading..." : " Register"}
                </button>
              </div>


            </div>
          </form>
        </div>
      </div>


    </Layout >
  );
};

export default Register;
