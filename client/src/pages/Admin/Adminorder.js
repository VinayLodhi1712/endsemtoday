import React from "react";
import { useState, useEffect } from "react";
import AdminMenu from "./../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import toast from "react-hot-toast";
import moment from "moment";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import noorders from "../../assests/noorders.jpeg";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const Adminorder = () => {
  const [status, SetStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Canceled",
    "Delivered",
  ]);
  const [Orders, SetOrders] = useState([]);
  const [auth, SetAuth] = useAuth();
  const Navigate = useNavigate();
  async function GetOrders() {
    try {
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/auth/Adminorders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
        }
      );
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
  async function HandleStatusChange(NewOrderStatus, id) {
    try {
      const response = await fetch(
        `https://ecomwebapp.onrender.com/api/v1/auth/OrderStatusUpdate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
          body: JSON.stringify({ status: NewOrderStatus }),
        }
      );
      if (response) {
        toast.success("Status Updated");
      }
      GetOrders();
    } catch (error) {
      toast.error("Error setting status");
    }
  }
  useEffect(() => {
    GetOrders();
  }, []);
  return (
    <Layout>
      <div className="bg d-flex justify-content-around mt-3">
        <div className="w-25">
          <AdminMenu></AdminMenu>
        </div>
        {Orders.length > 0 ? (
          <div style={{ width: "60%" }}>
            {" "}
            <h2 className="text-center">Manage Orders</h2>
            <div className="card  p-3">
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>

                          <td>
                            <Select
                              border={false}
                              onChange={(value) => {
                                HandleStatusChange(value, o._id);
                              }}
                              defaultValue={o.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o.buyer.Name}</td>
                          <td>{o.products.quantity}</td>
                          <td>{moment(o.createdAt).fromNow()}</td>
                        </tr>
                      </tbody>
                    </table>

                    {o.products.map((p, i) => (
                      <div className="d-flex justify-content-between border border-2 p-2">
                        <div style={{ width: "50%" }}>
                          <Image
                            src={`https://ecomwebapp.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
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
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="card  p-3 d-flex flex-column align-items-center"
            style={{ width: "70%" }}
          >
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

export default Adminorder;
