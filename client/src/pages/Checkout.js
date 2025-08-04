import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Image } from "antd";
import { API_BASE_URL } from "../config/api";
import "./checkout.css";

const Checkout = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const calculateTotalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ""
      });
    }
  };

  const handleCardChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    // Format expiry date
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    // Format CVV
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substring(0, 3);
    }

    setCardInfo({
      ...cardInfo,
      [e.target.name]: value
    });
  };

  const validateStep1 = () => {
    const errors = {};
    if (!shippingInfo.fullName.trim()) errors.fullName = "Full name is required";
    if (!shippingInfo.email.trim()) errors.email = "Email is required";
    if (!shippingInfo.phone.trim()) errors.phone = "Phone number is required";
    if (!shippingInfo.address.trim()) errors.address = "Address is required";
    if (!shippingInfo.city.trim()) errors.city = "City is required";
    if (!shippingInfo.state.trim()) errors.state = "State is required";
    if (!shippingInfo.zipCode.trim()) errors.zipCode = "ZIP code is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!paymentMethod) errors.paymentMethod = "Please select a payment method";
    
    if (paymentMethod === "card") {
      if (!cardInfo.cardholderName.trim()) errors.cardholderName = "Cardholder name is required";
      if (!cardInfo.cardNumber.trim()) errors.cardNumber = "Card number is required";
      if (!cardInfo.expiryDate.trim()) errors.expiryDate = "Expiry date is required";
      if (!cardInfo.cvv.trim()) errors.cvv = "CVV is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormErrors({});
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock order
      const orderData = {
        products: cart,
        shippingInfo,
        paymentMethod,
        totalAmount: calculateTotalPrice(),
        orderStatus: "Confirmed",
        paymentStatus: "Paid",
        orderId: `TC${Date.now()}`,
        transactionId: `TXN${Date.now()}`
      };

      // Store order in localStorage (mock database)
      const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
      existingOrders.push(orderData);
      localStorage.setItem("userOrders", JSON.stringify(existingOrders));

      // Clear cart
      setCart([]);
      localStorage.removeItem("Cart");

      toast.success("Order placed successfully!");
      navigate("/order-confirmation", { state: { orderData } });
      
    } catch (error) {
      console.log(error);
      toast.error("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty or user not logged in
  if (!auth?.token) {
    return (
      <Layout>
        <div className="checkout-container">
          <div className="access-denied">
            <h2>Please login to proceed with checkout</h2>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login Now
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <button className="shop-btn" onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Secure Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span>{currentStep > 1 ? '✓' : '1'}</span>
              <p>Shipping</p>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span>{currentStep > 2 ? '✓' : '2'}</span>
              <p>Payment</p>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <p>Review</p>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-left">
            
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="checkout-section">
                <h2>📍 Shipping Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      placeholder="Enter your full name"
                      className={formErrors.fullName ? 'error' : ''}
                    />
                    {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      placeholder="Enter your email"
                      className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      placeholder="Enter your phone number"
                      className={formErrors.phone ? 'error' : ''}
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="Enter your full address"
                      className={formErrors.address ? 'error' : ''}
                    />
                    {formErrors.address && <span className="error-message">{formErrors.address}</span>}
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      placeholder="Enter your city"
                      className={formErrors.city ? 'error' : ''}
                    />
                    {formErrors.city && <span className="error-message">{formErrors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      placeholder="Enter your state"
                      className={formErrors.state ? 'error' : ''}
                    />
                    {formErrors.state && <span className="error-message">{formErrors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      placeholder="Enter ZIP code"
                      className={formErrors.zipCode ? 'error' : ''}
                    />
                    {formErrors.zipCode && <span className="error-message">{formErrors.zipCode}</span>}
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <select name="country" value={shippingInfo.country} onChange={handleShippingChange}>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
                <div className="step-navigation">
                  <button 
                    className="next-step-btn"
                    onClick={handleNextStep}
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="checkout-section">
                <h2>💳 Payment Method</h2>
                <div className="payment-dropdown">
                  <label>Select Payment Method *</label>
                  <select 
                    value={paymentMethod} 
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      if (formErrors.paymentMethod) {
                        setFormErrors({...formErrors, paymentMethod: ""});
                      }
                    }}
                    className={formErrors.paymentMethod ? 'error' : ''}
                  >
                    <option value="">Choose payment method...</option>
                    <option value="card">💳 Credit/Debit Card</option>
                    <option value="upi">📱 UPI Payment</option>
                    <option value="cod">💵 Cash on Delivery</option>
                  </select>
                  {formErrors.paymentMethod && <span className="error-message">{formErrors.paymentMethod}</span>}
                </div>

                {paymentMethod === "card" && (
                  <div className="card-details">
                    <h3>Card Details</h3>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={cardInfo.cardholderName}
                          onChange={handleCardChange}
                          placeholder="Name on card"
                          className={formErrors.cardholderName ? 'error' : ''}
                        />
                        {formErrors.cardholderName && <span className="error-message">{formErrors.cardholderName}</span>}
                      </div>
                      <div className="form-group full-width">
                        <label>Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          className={formErrors.cardNumber ? 'error' : ''}
                        />
                        {formErrors.cardNumber && <span className="error-message">{formErrors.cardNumber}</span>}
                      </div>
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className={formErrors.expiryDate ? 'error' : ''}
                        />
                        {formErrors.expiryDate && <span className="error-message">{formErrors.expiryDate}</span>}
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className={formErrors.cvv ? 'error' : ''}
                        />
                        {formErrors.cvv && <span className="error-message">{formErrors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="payment-info">
                    <div className="info-card">
                      <h4>🚀 Quick UPI Payment</h4>
                      <p>You will be redirected to your UPI app to complete the payment securely.</p>
                      <ul>
                        <li>✓ Instant payment confirmation</li>
                        <li>✓ Secure UPI protocols</li>
                        <li>✓ No additional charges</li>
                      </ul>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="payment-info">
                    <div className="info-card">
                      <h4>💵 Cash on Delivery</h4>
                      <p>Pay with cash when your order is delivered to your doorstep.</p>
                      <ul>
                        <li>✓ Pay only after receiving your order</li>
                        <li>✓ Inspect products before payment</li>
                        <li>✓ Additional COD charges: ₹40</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="step-navigation">
                  <button 
                    className="prev-step-btn"
                    onClick={handlePrevStep}
                  >
                    ← Back to Shipping
                  </button>
                  <button 
                    className="next-step-btn"
                    onClick={handleNextStep}
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="checkout-section">
                <h2>📋 Review Your Order</h2>
                
                <div className="review-section">
                  <h3>Shipping Details</h3>
                  <div className="review-card">
                    <p><strong>{shippingInfo.fullName}</strong></p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p>{shippingInfo.country}</p>
                    <p>📧 {shippingInfo.email}</p>
                    <p>📱 {shippingInfo.phone}</p>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="review-card">
                    <p>
                      {paymentMethod === 'card' ? '💳 Credit/Debit Card' : 
                       paymentMethod === 'upi' ? '📱 UPI Payment' : '💵 Cash on Delivery'}
                    </p>
                    {paymentMethod === 'card' && (
                      <p>Card ending in {cardInfo.cardNumber.slice(-4)}</p>
                    )}
                  </div>
                </div>

                <div className="step-navigation">
                  <button 
                    className="prev-step-btn"
                    onClick={handlePrevStep}
                  >
                    ← Back to Payment
                  </button>
                  <button 
                    className={`place-order-btn ${loading ? 'loading' : ''}`}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🛒 Place Order - ₹{calculateTotalPrice().toLocaleString('en-IN')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-right">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="order-items">
                {cart?.map((product) => (
                  <div key={product._id} className="order-item">
                    <Image
                      src={`${API_BASE_URL}/product/get-productPhoto/${product._id}`}
                      alt={product.name}
                      className="order-item-image"
                      preview={false}
                    />
                    <div className="order-item-details">
                      <h4>{product.name}</h4>
                      <p>₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>₹{calculateTotalPrice().toLocaleString('en-IN')}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="total-row">
                    <span>COD Charges:</span>
                    <span>₹40</span>
                  </div>
                )}
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>₹{(calculateTotalPrice() + (paymentMethod === 'cod' ? 40 : 0)).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
