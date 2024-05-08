import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import AdminMenu from "./../../components/layout/AdminMenu";

const UpateProductUSer = () => {
  const [categories, SetCategories] = useState([]);
  const [photo, SetPhoto] = useState("");
  const [name, Setname] = useState("");
  const [description, Setdescription] = useState("");
  const [price, Setprice] = useState("");
  const [Pid, SetPid] = useState("");

  const [category, Setcategory] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [Singleproduct, SetSingleProduct] = useState("");
  const { Option } = Select;

  //get all categories
  async function GetCategories() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/category/GetAll-category",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data?.success) {
        SetCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const params = useParams();
  //get single product
  async function GetsingleProduct() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/getSingle-product/${params.slug}`
      );
      const data = await response.json();
      SetSingleProduct(data.product[0]._id);

      if (data?.success) {
        Setname(data.product[0].name);
        Setdescription(data.product[0].description);
        Setprice(data.product[0].price);
        Setcategory(data.product[0].category._id);
        SetPid(data.product[0]._id);
      } else {
        toast.error("Cannot get products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  }
  useEffect(() => {
    GetCategories();
    GetsingleProduct();
    //eslint-disabled-next-line
  }, []);

  async function HandleUpdateProduct(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ name, description, price, category })
    );
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/update-product/${Singleproduct}`,
        {
          method: "PUT",
          headers: {
            Authorization: auth?.token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data?.success) {
        toast.success("Product Updated Succesfully");
        setTimeout(() => {
          navigate("/dashboard/user/Product");
        }, 2000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong try Again");
    }
  }

  //delete product

  async function HandleDelete() {
    try {
      let answer = window.prompt("Delete this Product??");
      if (!answer) {
        return;
      } else {
        const response = await fetch(
          `http://localhost:8000/api/v1/product/Delete-product/${Singleproduct}`,
          {
            method: "delete",
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        const data = await response.json();
        if (data?.success) {
          toast.success(data.message);

          setTimeout(() => {
            navigate("/dashboard/admin/Product");
          }, 2000);
        } else {
          toast.error("Request not sent");
        }
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
  return (
    <Layout>
      <div
        className="bg d-flex justify-content-around mt-3 overflow-auto"
        style={{ height: "100%" }}
      >
        <div className="w-25">
          <AdminMenu />
        </div>
        <div className="w-50 d-flex flex-column" style={{ height: "100%" }}>
          <h1>Update Product</h1>
          <div className="w-75">
            <form onSubmit={HandleUpdateProduct}>
              <Select
                border={true}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-100 "
                required
                onChange={(value) => {
                  Setcategory(value);
                }}
                value={category}
              >
                {categories.map((c, index) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mt-4 d-flex flex-column align-items-center">
                <label className="btn border border-3 w-100 btn-outline-primary ">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      SetPhoto(e.target.files[0]);
                    }}
                    hidden
                  ></input>
                </label>
                <img
                  style={{ width: "5rem" }}
                  src={`http://localhost:8000/api/v1/product/get-productPhoto/${Pid}`}
                ></img>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Name the product"
                  className="form-control mt-3"
                  value={name}
                  onChange={(e) => {
                    Setname(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <div style={{ height: "25%" }}>
                <input
                  type="text"
                  placeholder="Description"
                  className="form-control mt-3 h-100"
                  value={description}
                  onChange={(e) => {
                    Setdescription(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <div>
                <input
                  type="Number"
                  placeholder="Price"
                  className="form-control mt-3"
                  value={price}
                  onChange={(e) => {
                    Setprice(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <button type="submit" className="mt-2 btn btn-primary">
                Update Product
              </button>
            </form>
            <button
              className="mt-2  btn btn-danger"
              onClick={() => {
                HandleDelete();
              }}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpateProductUSer;
