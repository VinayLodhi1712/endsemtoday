import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/Searchcontext";
import toast, { Toaster } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import "./../App.css";
import { Prices } from "../components/pricesfilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Image } from "antd";
import { Pagination } from "antd";

function Productpage() {
  const [Cart, SetCart] = useCart();
  const [Products, SetProducts] = useState([]);
  const [Categories, SetCategories] = useState([]);
  const [checked, SetChecked] = useState([]);
  const [auth, SetAuth] = useAuth();
  const [Radioval, SetRadioval] = useState([]);
  const [Page, Setpage] = useState(1);
  const [load, setLoad] = useState(false);
  const [FilterProductLength, SetFilterProductLength] = useState(true);
  const [pageSize, setPageSize] = useState(6);
  const [values, setValues] = useSearch();
  const [Total, SetTotalvalue] = useState(0);
  const Navigate = useNavigate();
  //get all catogaries
  async function GetCategories() {
    try {
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/category/GetAll-category",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        SetCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //SearchBar function
  async function HandleSubmit(e, Keyword) {
    e.preventDefault();
    let url;
    let geturl;
    try {
      url = `https://talkofcodebackend.onrender.com/api/v1/product/product-search/${Keyword}/65f9bb4749049ec84f1de5be`;
      geturl = `https://talkofcodebackend.onrender.com/api/v1/product/get-product/65f9bb4749049ec84f1de5be`;

      if (Keyword) {
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 210) {
          toast.error(data.message);
        }
        setValues({ ...values, Products: data.Products });
      } else {
        const response = await fetch(geturl);
        const data = await response.json();
        if (response.status === 210) {
          toast.error(data.message);
        }
        setValues({ ...values, Products: data.products });
        Navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Searching products");
    }
  }

  // get all products
  async function GetAllProducts() {
    try {
      let url;
      if (auth.user) {
        url = `https://talkofcodebackend.onrender.com/api/v1/product/product-list/${Page}/${auth.user._id}`;
      } else {
        url = `https://talkofcodebackend.onrender.com/api/v1/product/product-list/${Page}/65f2f1dc6ecc89ef55716aaf`;
      }

      const response = await fetch(url);

      const data = await response.json();
      if (data?.success) {
        SetProducts(data.Product);
      } else {
        toast.error("Cannot get products");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong");
    }
  }

  //get product by category filter
  async function HandleFilter(value, id) {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    SetChecked(all);
  }
  //filter products
  async function FilterProduct() {
    try {
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/product/productfilter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checked,
            priceRange: Radioval,
          }),
        }
      );
      const responseData = await response.json();
      SetProducts(responseData?.products);
      if (responseData.products.length == 0) {
        SetFilterProductLength(false);
      } else {
        SetFilterProductLength(true);
      }
    } catch (error) {
      toast.error("An error Occured");
      console.log(error);
    }
  }

  //get total produts
  async function GetTotal() {
    try {
      let url;
      if (auth.user) {
        url = `https://talkofcodebackend.onrender.com/api/v1/product/product-count/${auth.user._id}`;
      } else {
        url = `https://talkofcodebackend.onrender.com/api/v1/product/product-count/65f2f1dc6ecc89ef55716aaf`;
      }

      const response = await fetch(url);
      const data = await response.json();
      SetTotalvalue(data?.Total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (checked.length || Radioval.length) {
      FilterProduct();
      setLoad(false);
    } else {
      GetAllProducts();
      GetTotal();
      setLoad(true);
    }
  }, [Radioval, checked, Page, auth]);

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-end mt-3 ">
        <div
          style={{ width: "20%", marginLeft: "1rem" }}
          className="Fixed mt-3"
        >
           <h2 className="mediumtitlefont mb-3">Search Products</h2>
          <div className="container-fluid mb-4">         
            <form className="d-flex" role="search" onSubmit={HandleSubmit}>
              <Toaster />
             
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Products"
                aria-label="Search"
                onChange={(e) => {
                  // setValues({ ...values, Keyword: e.target.value });
                  HandleSubmit(e, e.target.value);
                }}

              />
            </form>
          </div>
          <div>
            <h2 className="mediumtitlefont">Select Category</h2>

            <div className="d-flex flex-column p-1">
              {Categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  className="smalltitlefont"
                  onChange={(e) => {
                    HandleFilter(e.target.checked, c._id);
                  }}
                >
                  <strong>{c.name}</strong>
                </Checkbox> // show categories as check box
              ))}
            </div>
          </div>
          {/* filter by price */}
          <div className="mt-3">
            <h2 className="mediumtitlefont">Select Price Range</h2>
            <div className="d-flex flex-column p-1">
              <Radio.Group
                onChange={(e) => {
                  SetRadioval(e.target.value);
                }}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio className="smalltitlefont" value={p.array}>
                      <strong>{p.name}</strong>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="mt-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className=" text-center " style={{ height: "100%", width: "80%" }}>
          <h1 className="Titlefont">All Products</h1>
          {FilterProductLength ? (
            <div
              className="d-flex justify-content-around flex-wrap "
              style={{ height: "100%", gap: "2rem" }}
            >
              {Products.map((p) => (
                <div
                  className="card d-flex border border-3 boxlayoutproducts"
                  style={{ width: "25%", height: "100%" }}
                >
                  <Image
                    src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                    className="card-Image-top productimage"
                    style={{ height: "15rem", width: "100%" }}
                  />

                  <div className="card-body text-start ProductDetailsCard">
                    <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text">
                      Price: <span className="priceSpan">₹ {p.price}</span>{" "}
                    </p>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-primary ButtonBorder"
                        onClick={() => {
                          if (!auth.user) {
                            toast("Please Login First", {
                              duration: 2000, // Set duration to 2 seconds
                            });
                          } else {
                            Navigate(`/ProductDetails/${p.slug}`);
                          }
                        }}
                      >
                        More details
                      </button>
                      <button
                        className="btn btn-light  border-dark border-2"
                        onClick={() => {
                          if (!auth.user) {
                            toast("Please Login First");
                          } else {
                            SetCart([...Cart, p]);
                            localStorage.setItem(
                              "Cart",
                              JSON.stringify([...Cart, p])
                            );
                            toast("Item Added to cart!");
                          }
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>No products found</h1>
          )}
          <Pagination
            className="mt-3 mb-3"
            total={Total}
            showQuickJumper
            pageSize={pageSize}
            onChange={(value) => {
              Setpage(value);
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Productpage;
