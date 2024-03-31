import React from "react";
import Layout from "../components/layout/layout";
import UserMEnu from "./../components/layout/UserMEnu";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Image } from "antd";
import toast from "react-hot-toast";
import noorders from "../assests/noorders.jpeg";

const Orders = () => {
  const [Orders, SetOrders] = useState([]);
  const [auth, SetAuth] = useAuth();
  const Navigate = useNavigate();

  async function GetOrders() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });
      const data = await response.json();
      if (data) {
        SetOrders(data.orders);
      } else {
        toast("Error Getting Data");
      }
    } catch (error) {
      toast.error("Error from server");
      console.log(error);
    }
  }
  async function CancelOrder(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/auth/OrderDelete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
        }
      );

      if (response.ok) {
        toast.success("Order Cancelled");
        GetOrders();
      }
    } catch (error) {
      toast.error("Error Cancelling Order");
    }
  }

  useEffect(() => {
    GetOrders();
  }, []);
  return (
    <Layout>
      <div className="d-flex justify-content-around mt-3">
        <div className="w-25">
          <UserMEnu />
        </div>
        {Orders.length > 0 ? (
          <div className="card w-50 p-3">
            <h1>Orders</h1>
            <div>
              {Orders.map((o, i) => (
                <>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr_no</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Date</th>
                        <th scope="col">Cancel</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>

                        <td>{o.status}</td>
                        <td>{o.buyer.Name}</td>

                        <td>
                          {o.products.reduce(
                            (total, product) =>
                              total + parseInt(product.quantity),
                            0
                          )}
                        </td>
                        <td>{moment(o.createdAt).fromNow()}</td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              CancelOrder(o._id);
                            }}
                          >
                            Cancel Order
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {o.products.map((p, i) => (
                    <div className="d-flex justify-content-between border border-2 p-2">
                      <div style={{ width: "50%" }}>
                        <Image
                          src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                          className="card-Image-top"
                          style={{ height: "100%", width: "10rem" }}
                        />
                      </div>

                      <div
                        className="d-flex flex-column align-items-start justify-content-start"
                        style={{ width: "60%" }}
                      >
                        <h5 className="card-title">{p.name}</h5>
                        <p
                          className="card-text"
                          style={{ marginBottom: "0rem" }}
                        >
                          {p.description.substring(0, 20)}...
                        </p>
                        <p className="card-text">Price: $ {p.price} </p>

                        <div
                          className="d-flex flex-column"
                          style={{ width: "55%", gap: "0.5rem" }}
                        >
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              Navigate(`/ProductDetails/${p.slug}`);
                            }}
                          >
                            More details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <p>{JSON.stringify(Orders)}</p> */}
                </>
              ))}
            </div>
          </div>
        ) : (
          <div className="card w-75 p-3 d-flex flex-column align-items-center">
            <h1>No Orders Found</h1>
            <h5>Look like you haven't ordered anything yet</h5>
            <Image src={noorders}></Image>
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                Navigate("/");
              }}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
