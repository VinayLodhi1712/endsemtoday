import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const User = () => {
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
        `http://localhost:8000/api/v1/auth/UsersList/${Page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
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
  async function HandleUserDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/auth/UserDelete/${id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        GetAllUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
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
      <div className="bg d-flex justify-content-around" style={{ width: "100%" }}>
        <div className="w-25">
          <AdminMenu />
        </div>
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
                <th scope="col">Action</th>
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
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        HandleUserDelete(u._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
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

export default User;
