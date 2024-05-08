import React from "react";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./../../App.css";
import { Image } from "antd";
import Layout from "../../components/layout/layout";
const Products = () => {
  const [Products, SetProducts] = useState([]);
  const [auth, SetAuth] = useAuth();
  async function GetAllProducts() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/get-product/${auth.user._id}`
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
      <div className="bg d-flex justify-content-around mt-3">
        <div className="w-25">
          <AdminMenu></AdminMenu>
        </div>

        <div className="w-75 " style={{ height: "100%" }}>
          <h1 className="text-center">All Products List</h1>
          <div
            className="d-flex justify-content-around flex-wrap align-items-center "
            style={{ gap: "0.5rem" }}
          >
            {Products.map((p) => (
              <div
                className="card d-flex border border-3 "
                style={{ width: "25%", height: "100%" }}
              >
                <Image
                  src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                  className="card-Image-top productimage"
                  style={{ height: "15rem", width: "100%" }}
                />
                <Link
                  to={`/dashboard/admin/Update-Product/${p.slug}`}
                  className="ProductLink"
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      {p.name.substring(0, 20)}...
                    </h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text">
                      <span className="priceSpan"> $ {p.price}</span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
