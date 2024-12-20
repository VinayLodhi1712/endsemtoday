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
import "./Productpage.css";
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
        <h2 className="text-center mt-3 ">Cart Summary</h2>

        <hr />
        <div className="items-center">
        <h4 className="text-center">
          You have{" "}
          {Cart.length < 2 ? Cart.length + " item" : Cart.length + " items"} in
          your cart.{" "}
        </h4>
        <div className="cartcard p-2">
          <h5>
            <b>Total Payable Amount:</b>₹ {TotalPrice()}.00
          </h5>
        </div>
        {auth?.token ? (
          //cart page items

          <div
            className="d-flex justify-content-center p-3"
            style={{ width: "100%" }}
          >
            {Cart.length > 0 ? (
              <div className="cartlayout ">
                <div
                  className="d-flex justify-content-center align-items-center flex-wrap "
                  
                >
                  {Cart?.map((p) => (
                    <div className="card2 border border-3">
                      <Image
                        src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                        className="card-Image-top productimage"
                        style={{ height: "15rem" }}
                      />

                      <div className="card-body text-start ProductDetailsCard">
                        <h5 className="card-title">
                          {p.name.substring(0, 15)}...
                        </h5>
                        <div className="card-text">
                          {p.description.substring(0, 20)}...
                        </div>
                        <div className="card-text">
                          Price: <span className="priceSpan">₹{p.price}</span>{" "}
                        </div>
                        <div className="productbuttons">
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
      </div>
    </Layout>
  );
};

export default CartPage;
