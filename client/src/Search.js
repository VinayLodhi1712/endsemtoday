import React from "react";
import Layout from "./components/layout/layout";
import { useSearch } from "./context/Searchcontext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./context/auth";
import { Image } from "antd";

const Search = () => {
  const Navigate = useNavigate();
  const [values, SetValues] = useSearch();
  const [auth, Setauth] = useAuth();
  return (
    <Layout>
      <div className="d-flex flex-column text-center mt-3">
        <div>Search Results</div>
        <div>
          {values.Products.length < 1
            ? "No Products found"
            : `Found ${values.Products.length} Produts`}

          <div
            className="d-flex justify-content-around flex-wrap "
            style={{ height: "100%", gap: "0.5rem" }}
          >
            {values.Products.map((p) => (
              <div
                className="card d-flex border border-3"
                style={{ width: "25%", height: "100%" }}
              >
                <Image
                  src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                  className="card-Image-top"
                  style={{ height: "15rem", width: "100%" }}
                />

                <div className="card-body text-start">
                  <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text">Price: $ {p.price} </p>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-primary w-75"
                      onClick={() => {
                        if (auth.user) {
                          Navigate(`/ProductDetails/${p.slug}`);
                        } else {
                          toast("Please Login First", {
                            duration: 2000,
                          });
                        }
                      }}
                    >
                      More details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;