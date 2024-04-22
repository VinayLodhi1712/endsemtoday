import React from "react";
import { useState, useEffect } from "react";
import UserMEnu from "../components/layout/UserMEnu";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { useAuth } from "../context/auth";
import { Image } from "antd";
import "../App";
import Layout from "../components/layout/layout";

const UpdateProducts = () => {
  const [Products, SetProducts] = useState([]);
  const [auth, setAuth] = useAuth();

  async function GetAllProducts() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/get-product-user/${auth.user._id}`
      );
      const data = await response.json();
      if (data?.success) {
        SetProducts(data.products);
        console.log(data);
      } else {
        toast.error("Cannot get products");
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  }

  useEffect(() => {
    GetAllProducts();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-around mt-3">
        <div className="w-25">
          <UserMEnu></UserMEnu>
        </div>

        <div className="w-50 " style={{ height: "100%" }}>
          <h1 className="text-center">Edit products listed by you</h1>
          <div
            className="d-flex justify-content-around flex-wrap align-items-center "
            style={{ gap: "0.5rem" }}
          >
            {Products.length > 0 ? (
              Products.map((p) => (
                <div
                  className="card border border-3 d-flex flex-column justify-content-center"
                  style={{ width: "50%", height: "100%" }}
                >
                  <Image
                    src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                    className="card-Image-top productimage"
                    style={{ height: "15rem", width: "100%" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      {p.name.substring(0, 50)}...
                    </h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text">
                      <span className="priceSpan"> ₹ {p.price}</span>
                    </p>
                    <Link to={`/dashboard/user/Update-Product/${p.slug}`}>
                      <button className="btn btn-primary w-100">Update</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex flex-column align-items-center">
                <h1>You have not listed any product</h1>
                <button
                  className="btn btn-dark ButtonBorder"
                  style={{ fontWeight: "700", width: "11rem" }}
                >
                  <NavLink
                    to="/dashboard/user/Create-Product"
                    className="list-group-item list-group-item-action d-flex justify-content-around align-items-center"
                  >
                    Create Product <FaPlusSquare />
                  </NavLink>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
