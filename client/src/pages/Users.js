import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { Tag } from "antd";
import toast from "react-hot-toast";
import { Pagination } from "antd";
import { FaMapMarkerAlt, FaStar, FaLightbulb } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Users = () => {
  const [Page, Setpage] = useState(1);

  const [Total, SetTotalvalue] = useState(0);

  const [Users, SetUsers] = useState([]);

  const [pageSize, setPageSize] = useState(9);

  async function GetAllUsers() {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/auth/UsersListNoLogin/${Page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        const data = await response.json();
        SetUsers(data.AllUsers);
      } else {
        toast.error("Unable to get user data");
      }
    } catch (error) {
      toast.error("Something Went Wrong Try Again");
    }
  }
  async function GetCount() {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/auth/UserCount`
      );
      const data = await response.json();
      SetTotalvalue(data?.Total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetAllUsers();
    GetCount();
  }, [Page]);

  useEffect(() => {
    GetCount();
  });

  return (
    <Layout>
      <div
        className="bg2 d-flex flex-column align-items-center"
        style={{ width: "100%" }}
      >
        <h3 className="mt-3 Titlefont">Total Active Users</h3>

        <div className="d-flex flex-wrap justify-content-around w-75">
          {Users.map((u, index) => (
            <div key={index} className="user-tile">
              <div className="user-image">
                <img
                  className="img-fluid"
                  style={{ width: "10rem", height: "10rem" }}
                  src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${u._id}`}
                  alt={u.Name}
                />
              </div>
              <div className="user-details">
                <NavLink
                  to={`/userinformation/${u._id}`}
                  className="Nomarginpara UsernameLink ff smalltitlefont3 center2"
                >
                  {u.Name}
                </NavLink>

                {u.Location && (
                  <div className="inline">
                    <FaMapMarkerAlt
                      style={{ color: "#0066CD", marginRight: "5px" }}
                    />
                    <p className="Nomarginpara" style={{ fontSize: "18px" }}>
                      {u.Location}
                    </p>
                  </div>
                )}

                <div className="inline mb-2">
                  <FaStar style={{ color: "#0066CD", marginRight: "5px" }} />
                  <p className="Nomarginpara" style={{ fontSize: "17px" }}>
                    Reputation: <strong>{u.Reputation}</strong>
                  </p>
                </div>

                {u.tags.length > 0 && (
                  <div className="center2" style={{ marginLeft: "1rem" }}>
                    <span>Skills: </span>
                    {u.tags.map((t, idnex) => (
                      <Tag key={index} color="blue">
                        {t}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          className="mt-3 mb-3"
          total={Total}
          showSizeChanger
          showQuickJumper
          pageSize={pageSize}
          onChange={(value) => {
            Setpage(value);
          }}
        />
      </div>
    </Layout>
  );
};

export default Users;
// image={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${u._id}`}
