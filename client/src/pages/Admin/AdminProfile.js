import React from "react";
import Layout from "../../components/layout/layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Tabs, Tag } from "antd";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AdminMenu from "./../../components/layout/AdminMenu";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const Profile = () => {
  const [auth, Setauth] = useAuth();
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [OldPassword, SetOldPassword] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [Location, SetLocation] = useState("");
  const [Number, SetNumber] = useState(0);
  const [photo, SetPhoto] = useState("");
  const [Github, SetGithub] = useState("");
  const [LinkedIn, SetLinkedIn] = useState("");
  const [Website, SetWebsite] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { TabPane } = Tabs;
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [userskills, setuserskills] = useState([]);
  const [visible, Setvisible] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTagInputChange = (e) => {
    e.preventDefault();
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };
  const handleTagRemove = (e, tagtoremove) => {
    e.preventDefault();
    const updatedItems = tags.filter((item) => item !== tagtoremove);
    setTags(updatedItems);
  };

  async function handlePersonalSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Number", Number);
      formData.append("photo", photo);
      formData.append("Location", Location);

      e.preventDefault();
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/profile",
        {
          method: "PUT",
          headers: {
            Authorization: auth.token,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.UpdatedUser,
          })
        );

        toast.success(data.message);
      } else {
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  async function handlePassword(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("OldPassword", OldPassword);
      formData.append("NewPassword", NewPassword);

      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/ProfilePassword",
        {
          method: "PUT",
          headers: {
            Authorization: auth.token,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.UpdatedUser,
          })
        );
        SetOldPassword("");
        SetNewPassword("");
        toast.success(data.message);
      } else {
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  async function handleLinksSubmit(e) {
    try {
      e.preventDefault();

      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/ProfileLinks",
        {
          method: "PUT",
          headers: {
            Authorization: auth.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Github,
            LinkedIn,
            Website,
            tags,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.UpdatedUser,
          })
        );
        SetGithub("");
        SetWebsite("");
        SetLinkedIn("");
        setTags("");
        toast.success(data.message);
      } else {
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  async function SkillsRemove(e, skilltoremove) {
    try {
      e.preventDefault();

      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/auth/userskillsupdate/${skilltoremove}`,
        {
          method: "PUT",
          headers: {
            Authorization: auth.token,
          },
        }
      );

      const data = await response.json();

      if (response.status == 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.user,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.user,
          })
        );
        console.log(data.user);
        toast.success("Skills Updated");
      } else {
        toast("Error", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Try Again");
    }
  }

  useEffect(() => {
    const { Email, Name, Address, MobileNo, Github, LinkedIn, Website, tags } =
      auth.user;
    SetName(Name);
    SetEmail(Email);
    SetLocation(Location);
    SetNumber(MobileNo);
    SetGithub(Github);
    SetWebsite(Website);
    SetLinkedIn(LinkedIn);
    setuserskills(tags);
  }, [auth?.user]);

  return (
    <Layout>
      <div className="bg d-flex justify-content-around">
        <div className="w-25 mt-3">
          <AdminMenu />
        </div>
        <Tabs centered style={{ width: "60%" }}>
          <TabPane
            tab={<span className="tabtitle">Personal Infromation</span>}
            key="1"
            className="TabPanePersonalInfo"
          >
            <div className="d-flex flex-column align-items-center mt-5">
              {" "}
              <img
                style={{ height: "14rem", width: "14rem", marginRight: "2rem" }}
                title
                className="img-circle img-thumbnail isTooltip EditProfileUSerPhoto"
                src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${auth.user._id}`}
                data-original-title="Usuario"
              />
              <div className="d-flex justify-content-start w-100 border-2 mb-2">
                <label className="btn border border-3  btn-outline-primary ">
                  {photo ? photo.name.substring(0, 20) : "Update Profile Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      SetPhoto(e.target.files[0]);
                    }}
                    hidden
                    required
                  ></input>
                </label>
              </div>
            </div>

            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "75%",
              }}
              onSubmit={(e) => {
                handlePersonalSubmit(e);
              }}
            >
              <div
                className="registerformupdate mt-3"
                style={{ width: "100%" }}
              >
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputName w-25 text-start"
                    className="form-label smalltitlefont3"
                  >
                    <strong>Name :</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={Name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputEmail1 w-25"
                    className="form-label smalltitlefont3"
                  >
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={Email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                    disabled
                  />
                </div>

                <div className="mb-1  w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label smalltitlefont3"
                  >
                    <b> Contact Number:</b>
                  </label>
                  <input
                    type="Number"
                    className="form-control w-100"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={Number}
                    onChange={(e) => {
                      SetNumber(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-2 w-100  d-flex align-items-center  justify-content-between">
                  <label className="form-label smalltitlefont3">
                    <b>Location:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    value={Location}
                    onChange={(e) => {
                      SetLocation(e.target.value);
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "8rem" }}
                >
                  Save
                </button>
                <Link
                  to="/dashboard/user"
                  className="mt-3 btn btn-outline-primary d-flex align-items-center text-decoration-none"
                >
                  <FaArrowLeft className="me-1" />
                  Back to Dashboard
                </Link>
              </div>
            </form>
          </TabPane>

          <TabPane
            tab={<span className="tabtitle">Change Password</span>}
            key="2"
          >
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              onSubmit={(e) => {
                handlePassword(e);
              }}
            >
              <div
                className="registerformupdatePassword mt-3"
                style={{ width: "100%" }}
              >
                <h3>
                  Change Password{" "}
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </h3>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>Old Password:</b>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={OldPassword}
                    onChange={(e) => {
                      SetOldPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>New Password:</b>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={NewPassword}
                    onChange={(e) => {
                      SetNewPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary "
                  style={{ width: "8rem" }}
                >
                  Save
                </button>
                <Link
                  to="/dashboard/user"
                  className="mt-3 btn btn-outline-primary d-flex align-items-center text-decoration-none"
                >
                  <FaArrowLeft className="me-1" />
                  Back to Dashboard
                </Link>
              </div>
            </form>
          </TabPane>

          <TabPane
            tab={<span className="tabtitle">Additional Information</span>}
            key="3"
          >
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              onSubmit={(e) => {
                handleLinksSubmit(e);
              }}
            >
              <div
                className="registerformupdatePassword mt-3"
                style={{ width: "100%" }}
              >
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>Github:</b>
                  </label>
                  <input
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={Github}
                    onChange={(e) => {
                      SetGithub(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>Linked In:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={LinkedIn}
                    onChange={(e) => {
                      SetLinkedIn(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>Website:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={Website}
                    onChange={(e) => {
                      SetWebsite(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex align-items-center w-100 mb-3 justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>Skills:</b>
                  </label>
                  <div className="d-flex w-75 justify-content-between">
                    <div className="w-75 border d-flex align-items-center flex-wrap gap-1">
                      {userskills.map((skill, index) => (
                        <Tag color="blue">{skill}</Tag>
                      ))}
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ width: "8rem" }}
                      onClick={() => {
                        Setvisible(true);
                      }}
                      type="button" // Add type="button" to prevent form submission
                    >
                      Edit
                    </button>
                  </div>
                  <Modal
                    visible={visible}
                    onCancel={() => {
                      Setvisible(false);
                    }}
                    footer={null}
                  >
                    <div className="mb-3">
                      {userskills.map((skill, index) => (
                        <Tag color="blue">
                          {skill}{" "}
                          <RxCross2
                            onClick={(e) => {
                              SkillsRemove(e, skill);
                            }}
                          />
                        </Tag>
                      ))}
                    </div>
                  </Modal>
                </div>

                <div className="d-flex align-items-center w-100 mb-3 justify-content-between">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label smalltitlefont3"
                  >
                    <b>Add Skills:</b>
                  </label>
                  <div className="d-flex w-75 justify-content-between">
                    {" "}
                    <input
                      type="text"
                      className="form-control w-75"
                      onChange={(e) => {
                        setTag(e.target.value);
                      }}
                      value={tag}
                      placeholder="Enter relevent tag that match your skills"
                    ></input>{" "}
                    <button
                      className="btn btn-primary"
                      style={{ width: "8rem" }}
                      onClick={(e) => {
                        handleTagInputChange(e);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  {tags.length > 0
                    ? tags.map((t) => (
                        <Tag color="blue">
                          {t}
                          <RxCross2
                            onClick={(e) => {
                              handleTagRemove(e, t);
                            }}
                          />
                        </Tag>
                      ))
                    : null}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "8rem" }}
                >
                  Save
                </button>
                <Link
                  to="/dashboard/user"
                  className="mt-3 btn btn-outline-primary d-flex align-items-center text-decoration-none"
                >
                  <FaArrowLeft className="me-1" />
                  Back to Dashboard
                </Link>
              </div>
            </form>
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
