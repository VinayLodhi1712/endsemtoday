import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { IoCartSharp } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import "./../../responsive.css";
function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  function HandleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  }

  return (
    <>
      <nav className="navbar bg-richblack-800 navbar-expand-lg" style={{ zIndex: "3" }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarTogglerDemo01">
            <div>
              <NavLink to="/" className="navbar-brand" href="#">
                TALKOFCODE
              </NavLink>
            </div>

            <div>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${auth ? (auth?.user?.Role === 1 ? `Admin` : `user`) : `user`}/interaction`}
                    className="nav-link"
                  >
                    CodeConnect
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/technews" className="nav-link">
                    Tech_Newsy
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Sign-up
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle d-flex align-items-center"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Avatar
                          alt={auth.user.Name}
                          src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${auth.user._id}`}
                          sx={{ width: 30, height: 30 }}
                        />
                        {auth.user.Name}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${auth?.user?.Role === 1 ? `Admin` : `user`}`}
                            className="dropdown-item"
                          >
                            Dashboard
                          </NavLink>
                        </li>

                        <li>
                          <NavLink className="dropdown-item nav-item" to="/Users">
                            Users
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item nav-item"
                            to="/login"
                            onClick={HandleLogout}
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/UserCart" className="nav-link">
                        <IoCartSharp />
                        <sup>
                          <Badge count={cart?.length} showZero></Badge>
                        </sup>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;