import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { API_BASE_URL } from "../config/api";
import "./orderHistory.css";

const OrderHistory = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
      return;
    }

    // Get orders from localStorage (mock database)
    const fetchOrders = () => {
      try {
        const userOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
        // Sort orders by date (newest first)
        const sortedOrders = userOrders.sort((a, b) => new Date(b.orderId.slice(2)) - new Date(a.orderId.slice(2)));
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth, navigate]);

  const formatDate = (orderId) => {
    // Extract timestamp from orderId (assuming format: TC{timestamp})
    const timestamp = parseInt(orderId.slice(2));
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'confirmed';
      case 'Processing':
        return 'processing';
      case 'Shipped':
        return 'shipped';
      case 'Delivered':
        return 'delivered';
      case 'Canceled':
        return 'canceled';
      default:
        return 'confirmed';
    }
  };

  const handleOrderClick = (order) => {
    navigate('/order-details', { state: { orderData: order } });
  };

  if (!auth?.token) {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="order-history-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="order-history-container">
        <div className="page-header">
          <h1>Order History</h1>
          <p>Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <button 
              className="start-shopping-btn"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div 
                key={index} 
                className="order-card"
                onClick={() => handleOrderClick(order)}
              >
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-id">Order #{order.orderId}</div>
                    <div className="order-date">Placed on {formatDate(order.orderId)}</div>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  <div className="items-preview">
                    {order.products.slice(0, 3).map((product, idx) => (
                      <div key={idx} className="item-preview">
                        <Image
                          src={`${API_BASE_URL}/product/get-productPhoto/${product._id}`}
                          alt={product.name}
                          className="item-preview-image"
                          preview={false}
                        />
                        <div className="item-preview-details">
                          <div className="item-name">
                            {product.name.length > 30 
                              ? `${product.name.substring(0, 30)}...` 
                              : product.name}
                          </div>
                          <div className="item-price">₹{product.price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    ))}
                    {order.products.length > 3 && (
                      <div className="more-items">
                        +{order.products.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-summary">
                    <div className="item-count">
                      {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                    </div>
                    <div className="order-total">
                      Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="order-actions">
                    <div className="payment-status">
                      <span className={`payment-badge ${order.paymentStatus.toLowerCase()}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <button className="view-details-btn">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="order-help">
          <h3>Need Help?</h3>
          <div className="help-options">
            <div className="help-item">
              <strong>Track Your Order</strong>
              <p>Click on any order to see detailed tracking information.</p>
            </div>
            <div className="help-item">
              <strong>Returns & Refunds</strong>
              <p>Contact support for returns within 30 days of delivery.</p>
            </div>
            <div className="help-item">
              <strong>Customer Support</strong>
              <p>Have questions? Our support team is here to help 24/7.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
