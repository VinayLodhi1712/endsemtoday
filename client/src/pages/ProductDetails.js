import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { Image } from "antd";
import Layout from "../components/layout/layout";
import { Modal, Button, Form } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

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

  const handleRating = (rate) => {
    setRating(rate);
  };
  async function GetProduct() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/getSingle-product/${params.slug}`
      );
      const data = await response.json();
      console.log(data)
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

  async function createReview() {
    const authId = auth.user._id;
    const productId = Detail[0]._id;

    if (comment && !isNaN(rating) && rating >= 1 && rating <= 5) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/product/get-product/${productId}/${authId}/create-review`,
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
          setShowModal(false)
          GetProduct();
        } else {
          const errorData = await response.json();
          setShowModal(false)
          throw new Error(errorData.message || "Failed to create review");
        }
      } catch (error) {
        console.error(error);
        setShowModal(false)
        toast.error("You have already reviewed");
      }
    } else {
      toast.error("Please provide a valid comment and rating (1-5)");
    }
  }

  async function deleteReview(reviewId) {
    const authId = auth.user._id
    const productId = Detail[0]._id;
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/get-product/${productId}/${authId}/delete-review/${reviewId}`,
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
    }
    catch (error) {
      console.error(error)
      toast.error("Something went Wrong in deleting review");
    }
  }

  useEffect(() => {
    if (showModal) {
      setComment('');
    }
  }, [showModal]);
  useEffect(() => {
    GetProduct();
  }, []);

  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center mb-5 Titlefont" >Product Details</h3>
        {Detail.map((p) => (
          <div key={p._id} className="card p-5 detailslayout" style={{ backgroundColor: "white" }}>
            <div className="row"> 
              <div className="col-md-6" style={{width:"40%"}}>
                <Image
                  src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                  className="card-Image-top"
                  style={{ height: "25rem" }}
                />
              </div>
              <div className="col-md-6" style={{width:"60%"}}>
                <div className="d-flex  mb-3">
                  <button className="button-16" style={{ marginRight: "120px", fontWeight: 600, letterSpacing: "1.2px" }} onClick={() => setShowDetails(true)}>DETAILS</button>
                  <button className="button-16" style={{ fontWeight: 600, letterSpacing: "1.2px" }} onClick={() => setShowDetails(false)}>REVIEWS</button>
                </div>
                {showDetails ? (
                  <div className="col-md-11">
                    <p className="Titlefont">{p.name} </p>
                    <p style={{ fontWeight: 600 }}> {p.description}</p>
                    <p className="tag"> {p.category.name}</p>
                    <p className="smalltitlefont">PRICE: <strong>     ₹{p.price}</strong> </p>

                    <div className="d-flex mt-2 w-60">
                      <button
                        className="button-27" style={{ marginRight: "60px" }}
                        onClick={() => {
                          SetCart([...Cart, p]);
                          localStorage.setItem("Cart", JSON.stringify([...Cart, p]));
                          toast("Item Added to cart!", {
                            icon: "👍",
                          });
                        }}
                      >
                        ADD TO CART
                      </button>
                      <button
                        className="button-24"
                        onClick={() => {
                          makeCall();
                        }}
                      >
                        <IoCall />
                        <span style={{ marginRight: "5px" }}></span>
                        Contact
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-10" style={{width:"100%"}}>
                    {typeof p.ratings === 'number' && p.ratings > 0 ? (
                      <p className="mediumtitlefont">
                        Rating:
                        {[...Array(Math.floor(p.ratings))].map((_, index) => (
                          <FontAwesomeIcon icon={faStar} key={index} style={{ color: "#FFD700", fontSize: "28px" }} />
                        ))}
                        {p.ratings % 1 !== 0 && (
                          <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#FFD700", fontSize: "28px" }} />
                        )}
                      </p>
                    ) : (
                      <p className="mediumtitlefont center">No rating available</p>
                    )}
                    <Button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>Create Review</Button>
                    {p.reviews.length > 0 && (
                      <div className="reviewlayout">
                        {p.reviews.map((review) => (
                          <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                            <div className="d-flex justify-content-between" style={{ marginRight: "10px" }}>
                              <div>
                                {[...Array(review.rating)].map((_, index) => (
                                  <span key={index} style={{ color: "#FFD700", fontSize: "28px" }}>&#9733;</span>
                                ))}
                              </div>
                              {auth.user && auth.user._id.toString() === review.user && (
                                <Button className="btn btn-danger mb-3 align-items-center" onClick={() => deleteReview(review._id)}>Delete</Button>
                              )}
                            </div>

                            <p style={{ fontWeight: 600 }}>{review.comment}</p>
                            <p className="mediumtitlefont" style={{ marginRight: "8rem" }}>- {review.name}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Create Review</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="formRating">
                            <Form.Label>Rating</Form.Label>
                            <Rating
                              onClick={handleRating}
                              ratingValue={rating}
                              size={30}
                            />
                          </Form.Group>
                          <Form.Group controlId="formComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control type="text" placeholder="Enter your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={createReview}>
                          Submit Review
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;