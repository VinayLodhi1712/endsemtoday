import React from "react";
import Layout from "../components/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Image } from "antd";
import { API_BASE_URL } from "../config/api";
import "./orderDetails.css";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If no order data, redirect to order history
    if (!orderData) {
      navigate("/order-history");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const formatDate = (orderId) => {
    const timestamp = parseInt(orderId.slice(2));
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const getTrackingSteps = () => {
    const steps = [
      { label: 'Order Confirmed', status: 'completed', date: formatDate(orderData.orderId) },
      { label: 'Processing', status: orderData.orderStatus === 'Processing' || orderData.orderStatus === 'Shipped' || orderData.orderStatus === 'Delivered' ? 'completed' : 'pending' },
      { label: 'Shipped', status: orderData.orderStatus === 'Shipped' || orderData.orderStatus === 'Delivered' ? 'completed' : 'pending' },
      { label: 'Delivered', status: orderData.orderStatus === 'Delivered' ? 'completed' : 'pending' }
    ];
    return steps;
  };

  return (
    <Layout>
      <div className="order-details-container">
        <div className="details-header">
          <button className="back-btn" onClick={() => navigate("/order-history")}>
            ← Back to Orders
          </button>
          <div className="order-title">
            <h1>Order #{orderData.orderId}</h1>
            <p>Placed on {formatDate(orderData.orderId)}</p>
          </div>
        </div>

        <div className="order-content">
          <div className="left-section">
            <div className="tracking-section">
              <h2>Order Tracking</h2>
              <div className="tracking-timeline">
                {getTrackingSteps().map((step, index) => (
                  <div key={index} className={`tracking-step ${step.status}`}>
                    <div className="step-indicator">
                      <div className="step-circle">
                        {step.status === 'completed' ? (
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      {index < getTrackingSteps().length - 1 && <div className="step-line"></div>}
                    </div>
                    <div className="step-content">
                      <div className="step-label">{step.label}</div>
                      {step.date && <div className="step-date">{step.date}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="items-section">
              <h2>Items Ordered</h2>
              <div className="detailed-items-list">
                {orderData.products.map((product, index) => (
                  <div key={index} className="detailed-item">
                    <Image
                      src={`${API_BASE_URL}/product/get-productPhoto/${product._id}`}
                      alt={product.name}
                      className="detailed-item-image"
                      preview={true}
                    />
                    <div className="detailed-item-info">
                      <h3>{product.name}</h3>
                      <p className="item-description">
                        {product.description.length > 150
                          ? `${product.description.substring(0, 150)}...`
                          : product.description}
                      </p>
                      <div className="item-meta">
                        <span className="item-price">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="item-quantity">Qty: 1</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="right-section">
            <div className="status-card">
              <h2>Order Status</h2>
              <div className="status-info">
                <div className="status-item">
                  <span className="status-label">Current Status:</span>
                  <span className={`status-value ${getStatusColor(orderData.orderStatus)}`}>
                    {orderData.orderStatus}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Payment Status:</span>
                  <span className={`payment-status ${orderData.paymentStatus.toLowerCase()}`}>
                    {orderData.paymentStatus}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Payment Method:</span>
                  <span className="method-value">
                    {orderData.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                     orderData.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
                  </span>
                </div>
                {orderData.transactionId && (
                  <div className="status-item">
                    <span className="status-label">Transaction ID:</span>
                    <span className="transaction-id">{orderData.transactionId}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="address-card">
              <h2>Shipping Address</h2>
              <div className="address-details">
                <div className="address-name">{orderData.shippingInfo.fullName}</div>
                <div className="address-line">{orderData.shippingInfo.address}</div>
                <div className="address-line">
                  {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}
                </div>
                <div className="address-line">{orderData.shippingInfo.country}</div>
                <div className="contact-details">
                  <div>📧 {orderData.shippingInfo.email}</div>
                  <div>📱 {orderData.shippingInfo.phone}</div>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-details">
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

            <div className="action-buttons">
              <button className="help-btn">
                Need Help?
              </button>
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        <div className="delivery-info">
          <h2>Delivery Information</h2>
          <div className="delivery-grid">
            <div className="delivery-item">
              <div className="delivery-icon">🚚</div>
              <div className="delivery-content">
                <h4>Free Delivery</h4>
                <p>No delivery charges on orders above ₹500</p>
              </div>
            </div>
            <div className="delivery-item">
              <div className="delivery-icon">📦</div>
              <div className="delivery-content">
                <h4>Secure Packaging</h4>
                <p>Items are packaged securely to prevent damage</p>
              </div>
            </div>
            <div className="delivery-item">
              <div className="delivery-icon">🔄</div>
              <div className="delivery-content">
                <h4>Easy Returns</h4>
                <p>30-day return policy for your peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
