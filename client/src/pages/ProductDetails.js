import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Image } from "antd";
import Layout from "../components/layout/layout";
import { Modal, Button, Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

// Import CSS
import "./productDetails.css"; // Import the CSS file we just created

const ProductDetails = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [Detail, SetDetails] = useState([]);
  const [auth, setAuth] = useAuth();
  const [Cart, SetCart] = useCart();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const handleRating = (rate) => {
    setRating(rate);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  async function GetProduct() {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/product/getSingle-product/${params.slug}`
      );
      const data = await response.json();
      SetDetails(data.product);
    } catch (error) {
      toast.error("Error showing details");
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

  async function createReview() {
    const authId = auth.user._id;
    const productId = Detail[0]._id;

    if (comment && !isNaN(rating) && rating >= 1 && rating <= 5) {
      try {
        const response = await fetch(
          `https://talkofcodebackend.onrender.com/api/v1/product/get-product/${productId}/${authId}/create-review`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating, comment }),
          }
        );
        if (response.ok) {
          toast.success("Review created successfully");
          setShowModal(false);
          GetProduct();
        } else {
          const errorData = await response.json();
          setShowModal(false);
          throw new Error(errorData.message || "Failed to create review");
        }
      } catch (error) {
        console.error(error);
        setShowModal(false);
        toast.error("You have already reviewed");
      }
    } else {
      toast.error("Please provide a valid comment and rating (1-5)");
    }
  }

  async function deleteReview(reviewId) {
    const authId = auth.user._id;
    const productId = Detail[0]._id;
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/product/get-product/${productId}/${authId}/delete-review/${reviewId}`,
        {
          method: "delete",
        }
      );
      if (response.ok) {
        toast.success("Review deleted successfully");
        GetProduct();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in deleting review");
    }
  }

  useEffect(() => {
    if (showModal) {
      setComment("");
    }
  }, [showModal]);
  
  useEffect(() => {
    GetProduct();
  }, []);

  return (
    <Layout>
      <div className="product-container">
        <h2 className="text-center mb-3 "style={{fontWeight:"600"}}>Product Details</h2>
        
        {Detail.map((p) => (
          <div className="row" key={p._id}>
            <div className="col-md-6 mb-3">
              <div className="product-image-container">
                <Image
                  src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                  className="product-image"
                  alt={p.name}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <span className="product-category">{p.category.name}</span>
              <h1 className="product-title">{p.name}</h1>
              
              {typeof p.ratings === "number" && p.ratings > 0 && (
                <div className="mb-2">
                  {[...Array(Math.floor(p.ratings))].map((_, index) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={index}
                      className="star"
                    />
                  ))}
                  {p.ratings % 1 !== 0 && (
                    <FontAwesomeIcon
                      icon={faStarHalfAlt}
                      className="star"
                    />
                  )}
                  <span className="ms-2 text-muted">({p.numofreviews} reviews)</span>
                </div>
              )}
              
              <p className="product-description">{p.description}</p>
              
              <div className="product-price">
                ₹{p.price}
                <span className="original-price">₹{Math.round(p.price * 1.3)}</span>
                <span className="discount">30% OFF</span>
              </div>
             
              
              <div className="quantity-selector">
                <span className="me-3">Quantity:</span>
                <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                <input type="text" className="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn" onClick={incrementQuantity}>+</button>
              </div>
              
              <div className="action-buttons">
                <button
                  className="cart-btn"
                  onClick={() => {
                    // Add the product multiple times based on quantity
                    const items = Array(quantity).fill(p);
                    SetCart([...Cart, ...items]);
                    localStorage.setItem(
                      "Cart",
                      JSON.stringify([...Cart, ...items])
                    );
                    toast(`${quantity} item(s) added to cart!`, {
                      icon: "👍",
                    });
                  }}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                
                <button className="buy-btn">Buy Now</button>
                
                <button
                  className="contact-btn"
                  onClick={() => makeCall()}
                >
                  <IoCall /> Contact Seller
                </button>
                
                <button className="wishlist-btn">
                  <FaRegHeart />
                </button>
              </div>
              
              <div className="tabs-container">
                <div className="tabs-header">
                  <button
                    className={`tab-btn ${showDetails ? 'active' : ''}`}
                    onClick={() => setShowDetails(true)}
                  >
                    Product Details
                  </button>
                  <button
                    className={`tab-btn ${!showDetails ? 'active' : ''}`}
                    onClick={() => setShowDetails(false)}
                  >
                    Reviews
                  </button>
                </div>
                
                <div className="tab-content">
                  {showDetails ? (
                    <div className="details-content">
                      <h5 className="mb-2">Specifications</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="list-group specs-list">
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Category</span>
                              <span className="fw-bold">{p.category.name}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Shipping</span>
                              <span className="fw-bold">Free</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Warranty</span>
                              <span className="fw-bold">1 Year</span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="list-group specs-list">
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Stock</span>
                              <span className="fw-bold">Available</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Returns</span>
                              <span className="fw-bold">7 Days</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Rating</span>
                              <span className="fw-bold">{p.ratings ? p.ratings.toFixed(1) : 'N/A'} / 5</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="reviews-container">
                      <div className="review-summary mb-3">
                        <div>
                          <h5 className="mb-2">Customer Reviews</h5>
                          {typeof p.ratings === "number" && p.ratings > 0 ? (
                            <div>
                              <p className="mb-0">Overall Rating: {p.ratings.toFixed(1)} out of 5</p>
                              <p className="text-muted mb-0">Based on {p.numofreviews} reviews</p>
                            </div>
                          ) : (
                            <p>No ratings yet</p>
                          )}
                        </div>
                        <div className="ms-auto">
                          <Button
                            className="create-review-btn"
                            onClick={() => setShowModal(true)}
                          >
                            Write a Review
                          </Button>
                        </div>
                      </div>
                      
                      {p.reviews.length > 0 ? (
                        <div className="reviews-grid">
                          {p.reviews.map((review) => (
                            <div className="review-card" key={review._id}>
                              <div className="review-header">
                                <div>
                                  {[...Array(review.rating)].map((_, index) => (
                                    <span key={index} className="star">★</span>
                                  ))}
                                </div>
                                {auth.user && auth.user._id.toString() === review.user && (
                                  <Button
                                    className="delete-review-btn"
                                    onClick={() => deleteReview(review._id)}
                                  >
                                    Delete
                                  </Button>
                                )}
                              </div>
                              <p className="review-comment">{review.comment}</p>
                              <p className="review-author">- {review.name}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-reviews">
                          <p className="mb-0">No reviews yet. Be the first to write one!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-review-title">Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRating" className="mb-3">
              <Form.Label>Your Rating</Form.Label>
              <div className="rating-container">
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={30}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                className="review-textarea"
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="modal-footer-btn"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="dark" 
            className="modal-footer-btn"
            onClick={createReview}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default ProductDetails;