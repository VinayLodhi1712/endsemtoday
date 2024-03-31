import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { Image } from "antd";
import Layout from "../components/layout/layout";
import { Modal, Button, Form } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'

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
  const handleRating = (rate) => {
    setRating(rate);
  };
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

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
          GetProduct();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create review");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong in creating review");
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
    GetProduct();
  }, []);
  return (
    <Layout>
      <div className="d-flex  mt-3 flex-column align-items-center">
        <h3
          className="text-center mb-5"
          style={{ fontWeight: "800", fontFamily: "sans-serif" }}
        >
          ProductDetails
        </h3>
        {Detail.map((p) => (
          <div
            className="d-flex justify-content-around mb-3"
            style={{ width: "70%" }}>


            <div style={{ width: "40%" }} className="d-flex flex-column align-items-center">
              <Image
                src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                className="card-Image-top"
                style={{ height: "25rem" }}
              />

              <div className="col-md-8">
                <h6><p><strong>Overall Rating: {p.ratings}/5</strong>
                </p></h6>
                <h5>Reviews</h5>
                <div style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "20px" }}>
                  {p.reviews.map((review) => (
                    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                      <p><strong>Name:</strong> {review.name}</p>
                      <p><strong>Rating:</strong>
                        {[...Array(review.rating)].map((_, index) => (
                          <span key={index} style={{ color: "yellow", fontSize: "28px" }}>&#9733;</span> // Render a star for each rating value
                        ))}</p>
                      <p><strong>Comment:</strong> {review.comment}</p>
                      <button className="btn btn-danger" onClick={() => deleteReview(review._id)}>Delete Review</button>
                    </div>
                  ))}
                </div>
                <Button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>Create Review</Button>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        {/* Render the Rating component for the user to select the rating */}
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
            </div>
            <div
              className="d-flex flex-column align-items-start"
              style={{ width: "40%" }}
            >
              <p className="mb-0">{p.category.name}</p>
              <p
                className="card-title"
                style={{ fontSize: "1.5rem", fontWeight: "700" }}
              >
                {p.name}
              </p>
              <p
                className="card-text mb-0"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                ₹ {p.price}{" "}
              </p>
              <p className="mb-3">{p.description}</p>

              <p className="mb-0">
                <b>Owner Name:</b> {p.owner.Name}
              </p>

              <div className="d-flex justify-content-around mt-3 w-50">
                <button
                  className="btn btn-light  border-dark border-2"
                  onClick={() => {
                    SetCart([...Cart, p]);
                    localStorage.setItem("Cart", JSON.stringify([...Cart, p]));
                    toast("Item Added to cart!", {
                      icon: "👍",
                    });
                  }}
                >
                  Add to cart
                </button>
                <button
                  className="btn btn-primary border-dark border-2  d-flex align-items-center "
                  onClick={() => {
                    makeCall();
                  }}
                >
                  <IoCall />
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </Layout>
  );
};

export default ProductDetails;