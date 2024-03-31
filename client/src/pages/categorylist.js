import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/layout";
import toast from "react-hot-toast";
import { Image } from "antd";
import { useAuth } from "../context/auth";
const Categorylist = () => {
  const [CatProducts, SetCatProducts] = useState([]);
  const [Category, SetCategory] = useState([]);
  const Params = useParams();
  const Navigate = useNavigate();
  const [auth, SetAuth] = useAuth();

  async function GetCatProduct() {
    try {
      let url;
      if (auth.user) {
        url = `http://localhost:8000/api/v1/product/product-CategoryWise/${Params.id}/${auth.user._id}`;
      } else {
        url = `http://localhost:8000/api/v1/product/product-CategoryWise/${Params.id}/65f9bb4749049ec84f1de5be`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        SetCatProducts(data.product);
        SetCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Retriving Products");
    }
  }

  useEffect(() => {
    GetCatProduct();
  }, [Params]);

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center">
        <h2 className="mt-3">Category : {Category.name}</h2>
        <div
          className="d-flex justify-content-around flex-wrap "
          style={{ height: "100%", gap: "0.5rem", width: "100%" }}
        >
          {CatProducts.length > 0 ? (
            CatProducts.map((p) => (
              <div
                className="card d-flex border border-3"
                style={{ width: "22%", height: "100%" }}
              >
                <Image
                  src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                  className="card-Image-top productimage"
                  style={{ height: "15rem", width: "100%" }}
                />

                <div className="card-body text-start">
                  <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text">
                    Price: <span className="priceSpan">$ {p.price}</span>{" "}
                  </p>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-primary ButtonBorder w-75"
                      onClick={() => {
                        if (!auth || !auth.user) {
                          toast("Please Login First");
                        } else {
                          Navigate(`/ProductDetails/${p.slug}`);
                        }
                      }}
                    >
                      More details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No Products Found</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categorylist;
