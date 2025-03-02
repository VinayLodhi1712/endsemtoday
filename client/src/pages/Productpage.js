import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/Searchcontext";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import "./../App.css";
import { Prices } from "../components/pricesfilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Image } from "antd";
import { Pagination } from "antd";
import './Productpage.css';

function Productpage() {
  const { Option } = Select;
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
  const [Total, SetTotalvalue] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const Navigate = useNavigate();

  //get all categories
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
  async function HandleSearch(e) {
    e.preventDefault();
    const keyword = searchKeyword.trim();
    
    try {
      if (keyword) {
        const url = `https://talkofcodebackend.onrender.com/api/v1/product/product-search/${keyword}/${auth?.user?._id || '65f9bb4749049ec84f1de5be'}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status === 210) {
          toast.error(data.message);
          return;
        }
        
        SetProducts(data.Products || []);
        SetFilterProductLength(data.Products?.length > 0);
      } else {
        // If search is empty, get all products
        GetAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error searching products");
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
        SetFilterProductLength(data.Product?.length > 0);
      } else {
        toast.error("Cannot get products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  }

  // Improved FilterProduct function with better debugging
  async function FilterProduct() {
    try {
      // Make sure we have valid data to send
      const requestData = {
        checked: checked,
        priceRange: Radioval,
      };
      
      console.log("Sending filter data:", JSON.stringify(requestData, null, 2));
      
      const response = await fetch(
        `https://talkofcodebackend.onrender.com/api/v1/product/productfilter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      
      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Raw filter response:", responseText);
      
      // Parse the response
      const responseData = JSON.parse(responseText);
      console.log("Parsed filter response:", responseData);
      
      // Update products state
      SetProducts(responseData?.products || []);
      SetFilterProductLength((responseData?.products || []).length > 0);
    } catch (error) {
      toast.error("An error occurred with filters");
      console.log("Filter error:", error);
    }
  }

  //get total products
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
    // Log when filters change to help debug
    console.log("Filter state changed:", { 
      categories: checked, 
      priceRange: Radioval 
    });
    
    if (checked.length || (Radioval && Radioval.length)) {
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

  // Improved handlePriceRangeChange to ensure array is set correctly
  const handlePriceRangeChange = (value) => {
    if (value) {
      // Find the selected price object by id
      const selectedPrice = Prices.find(p => p._id === value);
      if (selectedPrice && Array.isArray(selectedPrice.array)) {
        console.log("Setting price range to:", selectedPrice.array);
        // Make sure we're setting the array correctly
        SetRadioval(selectedPrice.array);
      }
    } else {
      // Clear the price filter
      SetRadioval([]);
    }
  };

  // Helper function to get the currently selected price ID
  const getSelectedPriceId = () => {
    if (!Radioval || !Radioval.length) return undefined;
    
    // Find the price object that matches the current Radioval array
    const selectedPrice = Prices.find(p => {
      if (!Array.isArray(p.array) || !Array.isArray(Radioval)) return false;
      if (p.array.length !== Radioval.length) return false;
      return p.array[0] === Radioval[0] && p.array[1] === Radioval[1];
    });
    
    return selectedPrice?._id;
  };

  return (
    <Layout>
      <div className="productpage">
        <Toaster position="top-right" />
        
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-row">
            {/* Search Filter */}
            <div className="filter-group">
              <h4 className="filter-heading">Search Products</h4>
              <form onSubmit={HandleSearch} style={{ display: 'flex', gap: '10px' }}>
                <input
                  className="form-control search-input"
                  type="search"
                  placeholder="Search products..."
                  aria-label="Search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
              </form>
            </div>
            
            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-heading">Select Category</h4>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select categories"
                value={checked}
                onChange={(values) => {
                  SetChecked(values);
                }}
              >
                {Categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            
            {/* Price Range Filter - Fixed implementation */}
            <div className="filter-group">
              <h4 className="filter-heading">Price Range</h4>
              <Select
                style={{ width: '100%' }}
                placeholder="Select price range"
                allowClear
                value={getSelectedPriceId()}
                onChange={handlePriceRangeChange}
              ><Option value="">None</Option>
                {Prices?.map((p) => (
                  <Option key={p._id} value={p._id}>
                    {p.name}
                  </Option>
                ))}
              </Select>
            </div>
            
            {/* Reset Button */}
            <div className="filter-group" style={{ flex: 0, minWidth: 'auto' }}>
              <button
                className="btn btn-danger reset-button"
                onClick={() => {
                  SetChecked([]);
                  SetRadioval([]);
                  setSearchKeyword("");
                  GetAllProducts();
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Display current filter state for debugging */}
        {(checked.length > 0 || Radioval.length > 0) && (
          <div className="current-filters p-2 mb-3" style={{ background: '#f8f9fa', borderRadius: '4px' }}>
            <small>
              <strong>Active Filters:</strong> 
              {checked.length > 0 && ` Categories (${checked.length})`}
              {Radioval.length > 0 && ` Price Range (${Radioval.join(' - ')})`}
            </small>
          </div>
        )}
        
        {/* Products Section */}
        <div className="products-container">
          <div className="products-header">
            <h2 className="products-title">Featured Products</h2>
            <span className="products-count">{Products.length} items found</span>
          </div>
          
          {FilterProductLength ? (
            <div className="productshow">
              {Products.map((p) => (
                <div className="boxlayoutproducts" key={p._id}>
                  <Image
                    src={`https://talkofcodebackend.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                    className="productimage"
                    alt={p.name}
                    preview={false}
                  />
                  <div className="ProductDetailsCard">
                    <div>
                      <h5 className="card-title">{p.name.substring(0, 25)}{p.name.length > 25 ? "..." : ""}</h5>
                      <div className="card-text">
                        {p.description.substring(0, 60)}{p.description.length > 60 ? "..." : ""}
                      </div>
                      <div className="card-text">
                        Price: <span className="priceSpan">₹{p.price}</span>
                      </div>
                    </div>
                    <div className="productbuttons">
                      <button
                        className="btn btn-primary ButtonBorder"
                        onClick={() => {
                          if (!auth.user) {
                            toast("Please Login First", {
                              duration: 2000,
                            });
                          } else {
                            Navigate(`/ProductDetails/${p.slug}`);
                          }
                        }}
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-light border-dark border-2 ButtonBorder"
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
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
          
          <Pagination
            className="mt-4 mb-3"
            current={Page}
            total={Total}
            showQuickJumper
            pageSize={pageSize}
            onChange={(value) => {
              Setpage(value);
            }}
            showSizeChanger={false}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Productpage;