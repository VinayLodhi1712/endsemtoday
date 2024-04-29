import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Users = () => {
  const [Page, Setpage] = useState(1);
  const [auth, Setauth] = useAuth();
  const [Total, SetTotalvalue] = useState(0);
  const [totaluser, settotaluser] = useState(5);
  const [Users, SetUsers] = useState([]);
  const [Loading, setLoading] = useState(false);

  async function GetAllUsers() {
    try {
      setLoading(true);
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
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Unable to get user data");
      }
    } catch (error) {
      setLoading(false);
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
    GetCount();
  }, [Page]);

  return (
    <Layout>
      <div>
        <h3>Users</h3>

        <div
          style={{ width: "60%" }}
          className="mt-3 d-flex flex-column align-items-center"
        >
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Sr_no</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((u, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{u.Name}</td>
                  <td>{u.Email}</td>
                  <td>{u.Address}</td>
                  <td>{u.Role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex" style={{ gap: "1rem" }}>
            {Page > 1 ? (
              <button
                className="btn btn-secondary ButtonBorder"
                onClick={() => {
                  Setpage(Page - 1);
                  settotaluser(totaluser - 5);
                }}
                disabled={Loading}
              >
                Back
              </button>
            ) : null}
            {totaluser < Total ? (
              <button
                className="btn btn-primary ButtonBorder"
                onClick={() => {
                  Setpage(Page + 1);
                  settotaluser(totaluser + 5);
                }}
                disabled={Loading}
              >
                Load More
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
