import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import { useCart } from "../../../context/cart";
import { Badge } from "antd";
import { IoCartSharp } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import "./header.css"; 

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
    <header className="header-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Mobile Toggle and Brand */}
          <div className="d-flex w-100 d-md-none mobile-header">
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

            <NavLink
              to="/"
              className="navbar-brand mobile-brand"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              TALKOFCODE
            </NavLink>
          </div>

          {/* Main Navigation */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* Brand - Desktop */}
            <div className="navbar-brand-container">
              <NavLink to="/" className="navbar-brand d-none d-md-block">
                TALKOFCODE
              </NavLink>
            </div>

            {/* Main Links */}
            <div className="navbar-links-container">
              <ul className="navbar-nav main-links">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    <span>Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">
                    <span>Products</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${auth ? (auth?.user?.Role === 1 ? `Admin` : `user`) : `user`}/interaction`}
                    className="nav-link"
                  >
                    <span>CodeConnect</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/technews" className="nav-link">
                    <span>Tech_Newsy</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Auth Links */}
            <div className="navbar-auth-container">
              <ul className="navbar-nav auth-links">
                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link signup-link">
                        <span>Sign-up</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link login-link">
                        <span>Login</span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown user-dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Avatar
                          alt={auth.user.Name || auth.user.displayName}
                          src={`https://talkofcodebackend.onrender.com/api/v1/auth/get-userPhoto/${auth.user._id}` || auth.user.photoURL}
                          sx={{ width: 30, height: 30 }}
                          className="user-avatar"
                        />
                        <span className="user-name">{auth.user.Name || auth.user.displayName}</span>
                      </a>
                      <ul className="dropdown-menu user-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${auth?.user?.Role === 1 ? `Admin` : `user`}`}
                            className="dropdown-item"
                          >
                            <span>Dashboard</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="/Users">
                            <span>Users</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/login"
                            onClick={HandleLogout}
                          >
                            <span>Logout</span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item cart-item">
                      <NavLink to="/UserCart" className="nav-link cart-link">
                        <IoCartSharp className="cart-icon" />
                        <Badge count={cart?.length} showZero className="cart-badge"></Badge>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;