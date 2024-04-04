import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Radio, Space } from "antd";
import { Descriptions } from "antd";
import { useAuth } from "../context/auth";
import { FaUserEdit } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";

import moment from "moment";
const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [auth, SetAuth] = useAuth();
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const items = [
    {
      key: "1",
      label: "UserName",
      children: auth.user.Name,
    },
    {
      key: "2",
      label: "Phone",
      children: auth.user.MobileNo,
    },
    {
      key: "3",
      label: "Email",
      children: auth.user.Email,
    },
    {
      key: "4",
      label: "Address",
      children: auth.user.Address,
    },
    {
      key: "5",
      label: "Joined ",
      children: moment(auth.user.createdAt).fromNow(),
    },
  ];
  const style = {
    py: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center h-100 p-3">
        <img
          src={`http://localhost:8000/api/v1/auth/get-userPhoto/${auth.user._id}`}
          className="card-Image-top productimage"
          style={{ height: "15rem", width: "100%" }}
        />
        <div className="d-flex flex-column justify-content-center  align-items-center">
          <Descriptions
            title="User Info"
            items={items}
            style={{ padding: "2rem" }}
          />
          <Space>
            <Button type="primary" onClick={showDrawer}>
              Dashboard
            </Button>
          </Space>
        </div>
        <Drawer
          title="User Dashboard"
          placement={placement}
          width={500}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Close</Button>
            </Space>
          }
        >
          <div
            className="d-flex justify-content-center flex-column align-items-center"
            style={{ gap: "2rem" }}
          >
            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/Profile"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <FaUserEdit /> Edit Profile
              </NavLink>
            </button>

            {/* <button
  className="btn btn-dark ButtonBorder w-100"
  style={{ fontWeight: "700" }}
>
  <NavLink
    to="/dashboard/user/Orders"
    className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
    style={{ gap: "0.5rem" }}
  >
    <BsFillCartCheckFill /> Your Orders
  </NavLink>
</button> */}

            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/Create-Product"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <FaPlusSquare /> Create Product
              </NavLink>
            </button>
            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/Product"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <MdPublishedWithChanges />
                Update Product
              </NavLink>
            </button>

            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/questions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <BsFillQuestionSquareFill /> Your Questions
              </NavLink>
            </button>

            <button
              className="btn btn-dark ButtonBorder w-100"
              style={{ fontWeight: "700" }}
            >
              <NavLink
                to="/dashboard/user/Contributions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <FaHandsHelping />
                Your Contributions
              </NavLink>
            </button>
          </div>
        </Drawer>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
