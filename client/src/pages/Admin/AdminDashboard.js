import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
import { Button, Drawer, Radio, Space } from "antd";
import { Descriptions } from "antd";
import { useAuth } from "../../context/auth";
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
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center h-100">
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
          title="Admin Dashboard"
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
            className="d-flex  flex-column "
            style={{ gap: "1rem", width: "100%" }}
          >
            <button className="btn btn-dark btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/create-Category"
                className="list-group-item list-group-item-action"
              >
                Create Category
              </NavLink>
            </button>
            <button className="btn btn-dark  btn-lg  ButtonBorder">
              <NavLink
                to="/dashboard/admin/create-product"
                className="list-group-item list-group-item-action"
              >
                Create New Product
              </NavLink>
            </button>
            <button className="btn btn-dark  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/Product"
                className="list-group-item list-group-item-action"
              >
                Edit a Product
              </NavLink>
            </button>

            {/* <button className="btn btn-info  btn-lg ButtonBorder" style={{fontWeight:"700"}}>
            <NavLink
              to="/dashboard/admin/Orders"
              className="list-group-item list-group-item-action"
            >
             Edit Orders
            </NavLink>
          </button> */}

            <button className="btn btn-dark  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/Admin/Profile"
                className="list-group-item list-group-item-action"
              >
                Edit Your Profile
              </NavLink>
            </button>

            <button className="btn btn-dark  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/Admin/Users"
                className="list-group-item list-group-item-action"
              >
                Manage Users
              </NavLink>
            </button>

            <button className="btn btn-dark  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/questions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
              >
                Your Questions
              </NavLink>
            </button>

            <button className="btn btn-dark  btn-lg ButtonBorder">
              <NavLink
                to="/dashboard/admin/Contributions"
                className="list-group-item list-group-item-action d-flex justify-content-center  align-items-center"
                style={{ gap: "0.5rem" }}
              >
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
