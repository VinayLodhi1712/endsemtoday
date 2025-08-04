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
import './cart.css';
import { API_BASE_URL } from "../config/api";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cart");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const userOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    setOrders(userOrders);
  }, []);

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

  const formatDate = (orderId) => {
    const timestamp = parseInt(orderId.slice(2));
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-header">
          <h2 className="cart-title">Shopping & Orders</h2>
          <div className="cart-divider"></div>
        </div>

        {auth?.token ? (
          <>
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`}
                onClick={() => setActiveTab('cart')}
              >
                🛒 Shopping Cart ({cart.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                📦 My Orders ({orders.length})
              </button>
            </div>

            {/* Cart Tab Content */}
            {activeTab === 'cart' && (
              <>
                <div className="cart-summary">
                  <div className="cart-count">
                    You have {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
                  </div>
                  <div className="cart-total">
                    <b>Total Amount:</b> ₹{calculateTotalPrice()}.00
                  </div>
                  <div className="shipping-info">
                    <span className="shipping-text">🚚 Free Shipping on all orders</span>
                  </div>
                  <button
                    className="checkout-button-top"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>

                {cart.length > 0 ? (
                  <>
                    <div className="cart-items-container">
                      {cart?.map((product) => (
                        <div key={product._id} className="cart-item2">
                          <Image
                            src={`${API_BASE_URL}/product/get-productPhoto/${product._id}`}
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
                  </>
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
            )}

            {/* Orders Tab Content */}
            {activeTab === 'orders' && (
              <div className="orders-tab-content">
                {orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map((order, index) => (
                      <div key={index} className="order-summary-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h4>Order #{order.orderId}</h4>
                            <p>Placed on {formatDate(order.orderId)}</p>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>
                        <div className="order-items-preview">
                          {order.products.slice(0, 2).map((product, idx) => (
                            <div key={idx} className="order-item-preview">
                              <Image
                                src={`${API_BASE_URL}/product/get-productPhoto/${product._id}`}
                                alt={product.name}
                                className="order-preview-image"
                                preview={false}
                              />
                              <span className="order-item-name">{product.name}</span>
                            </div>
                          ))}
                          {order.products.length > 2 && (
                            <span className="more-items">+{order.products.length - 2} more</span>
                          )}
                        </div>
                        <div className="order-footer">
                          <div className="order-total">₹{order.totalAmount.toLocaleString('en-IN')}</div>
                          <button 
                            className="view-order-btn"
                            onClick={() => navigate('/order-details', { state: { orderData: order } })}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-orders">
                    <div className="no-orders-icon">📦</div>
                    <h3>No Orders Yet</h3>
                    <p>Your order history will appear here once you make your first purchase.</p>
                    <button 
                      className="start-shopping-btn"
                      onClick={() => {
                        setActiveTab('cart');
                        navigate('/products');
                      }}
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
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



