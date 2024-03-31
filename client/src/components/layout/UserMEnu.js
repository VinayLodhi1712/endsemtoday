import React from "react";
import { NavLink } from "react-router-dom";
const UserMEnu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h1>User Dashboard</h1>

          <NavLink
            to="/dashboard/user/Profile"
            className="list-group-item list-group-item-action"
          >
            Edit Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/Product"
            className="list-group-item list-group-item-action"
          >
            Update Product
          </NavLink>

          <NavLink
            to="/dashboard/user/Create-Product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          {/* <NavLink
            to="/dashboard/User/Orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink> */}
          <NavLink
            to="/dashboard/User/Questions"
            className="list-group-item list-group-item-action"
          >
            Your Questions
          </NavLink>
          <NavLink
            to="/dashboard/User/Contributions"
            className="list-group-item list-group-item-action"
          >
            Your Contributions
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMEnu;
