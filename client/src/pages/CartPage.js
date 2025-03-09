import React from "react";
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
import './cart.css';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const removeCartItem = (id) => {
    try {
      const updatedCart = [...cart];
      const index = updatedCart.findIndex((item) => item._id === id);
      updatedCart.splice(index, 1);
      setCart(updatedCart);
      localStorage.setItem("Cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart!");
    } catch (error) {
      console.log(error);
      toast.error("Error removing item");
    }
  };

  const calculateTotalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price;
      });
      return total.toLocaleString('en-IN');
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-header">
          <h2 className="cart-title">Your Shopping Cart</h2>
          <div className="cart-divider"></div>
        </div>

        {auth?.token ? (
          <>
            <div className="cart-summary">
              <div className="cart-count">
                You have {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
              </div>
              <div className="cart-total">
                <b>Total Amount:</b> ₹{calculateTotalPrice()}.00
              </div>
            </div>

            {cart.length > 0 ? (
              <div className="cart-items-container">
                {cart?.map((product) => (
                  <div key={product._id} className="cart-item">
                    <Image
                      src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${product._id}`}
                      alt={product.name}
                      className="cart-item-image"
                      preview={true}
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">
                        {product.name.length > 20
                          ? `${product.name.substring(0, 20)}...`
                          : product.name}
                      </h3>
                      <p className="cart-item-description">
                        {product.description.length > 60
                          ? `${product.description.substring(0, 60)}...`
                          : product.description}
                      </p>
                      <p className="cart-item-price">
                        Price: <span className="price-amount">₹{product.price.toLocaleString('en-IN')}</span>
                      </p>
                      <div className="cart-buttons">
                        <button
                          className="cart-button details-button"
                          onClick={() => navigate(`/ProductDetails/${product.slug}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="cart-button remove-button"
                          onClick={() => removeCartItem(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-cart">
                <img src={emptycart} alt="Your cart is empty" />
                <button
                  className="shopping-button"
                  onClick={() => navigate("/products")}
                >
                  Browse Products
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="login-message">
            <h4>Please login to view your cart</h4>
            <button
              className="login-button"
              onClick={() => navigate("/login")}
            >
              Login to Continue
            </button>
            <Image 
              src={cartimage} 
              alt="Login to view cart" 
              preview={false}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;