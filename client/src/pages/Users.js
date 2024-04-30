import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { Tag } from "antd";
import toast from "react-hot-toast";
import { Pagination } from "antd";

import { NavLink } from "react-router-dom";
const Users = () => {
  const [Page, Setpage] = useState(1);

  const [Total, SetTotalvalue] = useState(0);

  const [Users, SetUsers] = useState([]);

  const [pageSize, setPageSize] = useState(12);

  async function GetAllUsers() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/auth/UsersListNoLogin/${Page}`,
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
        `http://localhost:8000/api/v1/auth/UserCount`
      );
      const data = await response.json();
      SetTotalvalue(data?.Total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetAllUsers();
  }, [Page]);

  useEffect(() => {
    GetCount();
  });

  return (
    <Layout>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "100%" }}
      >
        <h3 className="mt-2 ">Users</h3>

        <div
          className=" d-flex align-items-center flex-wrap justify-content-around w-75"
          style={{ gap: "3rem" }}
        >
          {Users.map((u, _id) => (
            <div
              className="candidate-list candidate-grid d-flex flex-column align-items-start border p-2"
              style={{ width: "20%" }}
            >
              <div className="UserImage d-flex justify-content-center w-100">
                <img
                  className="img-fluid "
                  style={{ width: "10rem", height: "10rem" }}
                  src={`http://localhost:8000/api/v1/auth/get-userPhoto/${u._id}`}
                />
              </div>
              <div className="d-flex flex-column align-items-start justify-content-start ">
                <NavLink
                  to={`/userinformation/${u._id}`}
                  className="Nomarginpara UsernameLink"
                >
                  {u.Name}
                </NavLink>
                <p className="Nomarginpara">{u.Location}</p>
                <p className="Nomarginpara">
                  Reputation:<strong>{u.Reputation}</strong>
                </p>
                <div>
                  {u.tags.length > 0 ? (
                    <>
                      <span> Skills: </span>
                      {u.tags.map((t) => (
                        <Tag color="blue">{t}</Tag>
                      ))}
                    </>
                  ) : null}
                </div>
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
// image={`http://localhost:8000/api/v1/auth/get-userPhoto/${u._id}`}
