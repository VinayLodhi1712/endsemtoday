import React, { useState } from "react";
import { useSearch } from "../../context/Searchcontext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [auth, SetAuth] = useAuth();

  async function HandleSubmit(e, Keyword) {
    e.preventDefault();
    let url;
    let geturl;
    try {
      if (auth.user) {
        url = `https://talkofcodebackend.onrender.com/api/v1/product/product-search/${Keyword}/${auth.user._id}`;
        geturl = `https://talkofcodebackend.onrender.com/api/v1/product/get-product/${auth.user._id}`;
      } else {
        url = `https://talkofcodebackend.onrender.com/api/v1/product/product-search/${Keyword}/65f9bb4749049ec84f1de5be`;
        geturl = `https://talkofcodebackend.onrender.com/api/v1/product/get-product/65f9bb4749049ec84f1de5be`;
      }
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
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Searching products");
    }
  }
  return (
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
        onFocus={() => {
          navigate("/search");
        }}
      />
    </form>
  );
};

export default SearchBar;
