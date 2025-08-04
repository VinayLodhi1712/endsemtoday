import React from "react";
import Layout from "../components/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Image } from "antd";
import { API_BASE_URL } from "../config/api";
import "./orderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="order-confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#28a745"/>
              <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <div className="order-details-card">
          <div className="order-info-header">
            <h2>Order Details</h2>
            <div className="order-meta">
              <div className="order-id">
                <strong>Order ID:</strong> {orderData.orderId}
              </div>
              <div className="order-date">
                <strong>Order Date:</strong> {formatDate(Date.now())}
              </div>
            </div>
          </div>

          <div className="order-status-section">
            <div className="status-item">
              <span className="status-label">Order Status:</span>
              <span className="status-value confirmed">{orderData.orderStatus}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Payment Status:</span>
              <span className="status-value paid">{orderData.paymentStatus}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Payment Method:</span>
              <span className="status-value">
                {orderData.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                 orderData.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
              </span>
            </div>
            {orderData.transactionId && (
              <div className="status-item">
                <span className="status-label">Transaction ID:</span>
                <span className="status-value">{orderData.transactionId}</span>
              </div>
            )}
          </div>

          <div className="ordered-items">
            <h3>Items Ordered</h3>
            <div className="items-list">
              {orderData.products.map((product, index) => (
                <div key={index} className="ordered-item">
                  <Image
                    src={`${API_BASE_URL}/product/get-productPhoto/${product._id}`}
                    alt={product.name}
                    className="ordered-item-image"
                    preview={false}
                  />
                  <div className="ordered-item-details">
                    <h4>{product.name}</h4>
                    <p className="item-description">
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </p>
                    <div className="item-price">₹{product.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <div className="address-card">
              <div className="address-name">{orderData.shippingInfo.fullName}</div>
              <div className="address-details">
                {orderData.shippingInfo.address}<br/>
                {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}<br/>
                {orderData.shippingInfo.country}
              </div>
              <div className="contact-info">
                <div>Email: {orderData.shippingInfo.email}</div>
                <div>Phone: {orderData.shippingInfo.phone}</div>
              </div>
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({orderData.products.length} items):</span>
              <span>₹{orderData.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>₹0</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount:</span>
              <span>₹{orderData.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Order Processing</h4>
                <p>We'll start processing your order within 24 hours.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Shipping</h4>
                <p>Your order will be shipped within 2-3 business days.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Delivery</h4>
                <p>Expect delivery within 5-7 business days.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="btn-secondary"
            onClick={() => navigate("/order-history")}
          >
            View Order History
          </button>
          <button 
            className="btn-primary"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
