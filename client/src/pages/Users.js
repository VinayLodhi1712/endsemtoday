import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { Tag } from "antd";
import toast from "react-hot-toast";
import { Pagination } from "antd";
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
        className="d-flex flex-column align-items-center "
        style={{ width: "90%", marginLeft: "auto" }}
      >
        <h3 className="mt-2 ">Users</h3>

        <div className=" d-flex align-items-center flex-wrap justify-content-around w-100 gap-1">
          {Users.map((u) => (
            <div className="d-flex gap-3 mb-5" style={{ width: "20%" }}>
              <img
                src={`http://localhost:8000/api/v1/auth/get-userPhoto/${u._id}`}
                className=""
                style={{ width: "4rem", height: "5rem" }}
              ></img>
              <div>
                <p className="Nomarginpara text-primary ">{u.Name}</p>
                <p className="Nomarginpara">{u.Location}</p>
                <p className="Nomarginpara">
                  <strong>{u.Reputation}</strong>
                </p>
                <div className="d-flex flex-wrap">
                  {u.tags.map((t) => (
                    <Tag color="blue">{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
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
