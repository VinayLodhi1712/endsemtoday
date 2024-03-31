import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { Image } from "antd";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
const ProductDetails = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [Detail, SetDetails] = useState([]);

  const [Cart, SetCart] = useCart();

  async function GetProduct() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/getSingle-product/${params.slug}`
      );

      const data = await response.json();
      SetDetails(data.product);
    } catch (error) {
      toast.error("Error Showing details");
      console.log(error);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    }
  }
  function makeCall() {
    var phoneNumber = Detail[0].owner.MobileNo;

    var telURI = "tel:+91" + phoneNumber;
    // Open the phone's default calling app
    var link = document.createElement("a");
    link.href = telURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <Layout>
      <div className="d-flex  mt-3 flex-column align-items-center">
        <h3
          className="text-center mb-5"
          style={{ fontWeight: "800", fontFamily: "sans-serif" }}
        >
          ProductDetails
        </h3>
        {Detail.map((p) => (
          <div
            className="d-flex  justify-content-around mb-3"
            style={{ width: "70%" }}
          >
            <div style={{ width: "40%" }} className="d-flex ">
              <Image
                src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                className="card-Image-top"
                style={{ height: "25rem" }}
              />
            </div>

            <div
              className="d-flex flex-column align-items-start"
              style={{ width: "40%" }}
            >
              <p className="mb-0">{p.category.name}</p>
              <p
                className="card-title"
                style={{ fontSize: "1.5rem", fontWeight: "700" }}
              >
                {p.name}
              </p>
              <p
                className="card-text mb-0"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                ₹ {p.price}{" "}
              </p>
              <p className="mb-3">{p.description}</p>

              <p className="mb-0">
                <b>Owner Name:</b> {p.owner.Name}
              </p>

              <div className="d-flex justify-content-around mt-3 w-50">
                <button
                  className="btn btn-light  border-dark border-2"
                  onClick={() => {
                    SetCart([...Cart, p]);
                    localStorage.setItem("Cart", JSON.stringify([...Cart, p]));
                    toast("Item Added to cart!", {
                      icon: "👍",
                    });
                  }}
                >
                  Add to cart
                </button>
                <button
                  className="btn btn-primary border-dark border-2  d-flex align-items-center "
                  onClick={() => {
                    makeCall();
                  }}
                >
                  <IoCall />
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
