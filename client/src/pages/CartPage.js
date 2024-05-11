import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import cartimage from "../assests/cartimage.png";
import emptycart from "../assests/emptycart.png";
import { Image } from "antd";
import ".././App.css";
const CartPage = () => {
  const [Cart, setCart] = useCart();
  const [auth, SetAuth] = useAuth();
  const Navigate = useNavigate();

  function RemoveCartItems(id) {
    try {
      let MyCart = [...Cart];
      let index = MyCart.findIndex((Item) => Item._id == id);
      MyCart.splice(index, 1);
      setCart(MyCart);
      localStorage.setItem("Cart", JSON.stringify(MyCart));
      toast("Item removed from cart!");
    } catch (error) {
      console.log(error);
      toast.error("Error Removing item");
    }
  }
  function TotalPrice() {
    try {
      let total = 0;
      Cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div style={{ width: "100%" }} className="mt-3">
        <h4 className="text-center">
          You have{" "}
          {Cart.length < 2 ? Cart.length + " item" : Cart.length + " items"} in
          your cart.{" "}
        </h4>
        {auth?.token ? (
          //cart page items

          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            {Cart.length > 0 ? (
              <div
                className="d-flex justify-content-start"
                style={{ width: "100%" }}
              >
                <div
                  className="d-flex justify-content-center align-items-center flex-wrap"
                  style={{ gap: "1rem", width: "50%" }}
                >
                  {Cart?.map((p) => (
                    <div
                      className="card border border-3"
                      style={{ width: "40%" }}
                    >
                      <Image
                        src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                        className="card-Image-top productimage"
                        style={{ height: "15rem", width: "100%" }}
                      />

                      <div className="card-body text-start ProductDetailsCard">
                        <h5 className="card-title">
                          {p.name.substring(0, 15)}...
                        </h5>
                        <p className="card-text">
                          {p.description.substring(0, 20)}...
                        </p>
                        <p className="card-text">
                          Price: <span className="priceSpan">₹ {p.price}</span>{" "}
                        </p>
                        <div className="d-flex justify-content-around">
                          <button
                            className="btn btn-primary ButtonBorder"
                            onClick={() => {
                              Navigate(`/ProductDetails/${p.slug}`);
                            }}
                          >
                            More details
                          </button>
                          <button
                            className="btn btn-danger ButtonBorder"
                            onClick={() => {
                              RemoveCartItems(p._id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="d-flex flex-column CartFixed"
                  style={{ width: "40%" }}
                >
                  <h2 className="text-center mt-3 ">Cart Summary</h2>

                  <hr />
                  <div className="card p-2">
                    <h5>
                      <b>Total Payable Amount:</b>₹ {TotalPrice()}.00
                    </h5>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <img src={emptycart} style={{ width: "20rem" }} />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    Navigate("/products");
                  }}
                >
                  Add Items to cart
                </button>
              </div>
            )}
          </div>
        ) : (
          //message if not login
          <div className="text-center d-flex flex-column align-items-center">
            <h4>Please login to access your cart</h4>
            <button
              className="btn btn-primary"
              onClick={() => {
                Navigate("/login");
              }}
            >
              Login
            </button>
            <Image src={cartimage}></Image>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
