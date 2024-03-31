import React from "react";
import Layout from "../../components/layout/layout";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import AdminMenu from "./../../components/layout/AdminMenu";
const Profile = () => {
  const [auth, Setauth] = useAuth();
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Address, SetAddress] = useState("");
  const [Number, SetNumber] = useState(0);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
          body: JSON.stringify({
            Name,
            Email,
            Password,
            Address,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem("auth", JSON.stringify(auth.user));
        console.log("set auth");
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

  useEffect(() => {
    const { Email, Name, Address, MobileNo } = auth.user;
    SetName(Name);
    SetEmail(Email);
    SetAddress(Address);
    SetNumber(MobileNo);
  }, [auth?.user]);
  return (
    <Layout>
      <div
        className="d-flex justify-content-around"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="d-flex mt-3">
          <AdminMenu />
        </div>
        <form
          style={{ display: "flex", justifyContent: "center", width: "70%" }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="FormBackgound"
        >
          <div className="registerformupdate mt-3" style={{ width: "50%" }}>
            <h1>Update Profile</h1>
            <div className="mb-2 wi">
              <label htmlFor="exampleInputName" className="form-label">
                <b>New Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={Name}
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
            </div>

            <div className="mb-2 wi">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Your Email address (Cannot be Changed)</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={Email}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                disabled
              />
            </div>

            <div className="mb-2 wi">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <b>New Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={Password}
                onChange={(e) => {
                  SetPassword(e.target.value);
                }}
              />
            </div>

            <div className="mb-2 wi">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>New Contact Number</b>
              </label>
              <input
                type="Number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={Number}
                onChange={(e) => {
                  SetNumber(e.target.value);
                }}
              />
            </div>

            <div className="mb-2 wi">
              <label className="form-label">
                <b>Address</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={Address}
                onChange={(e) => {
                  SetAddress(e.target.value);
                }}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark ">
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
