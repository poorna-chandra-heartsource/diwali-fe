import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/header.css";
import { Link } from 'react-router-dom';

const Header = ({ cartCount, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        {/* <img
          src="/Images/Diwali-logo-new.png"
          alt="logo"
          height="100px"
          width="100px"
          style={{ borderRadius: "50%" }}
        /> */}
        <a href="/">Diwali Inquiries</a>
      </div>
      <nav>
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
              <Link to="/order-list">Inquiries</Link>
              </li>
            </>
          )}
          {isLoggedIn ? (
            <li onClick={handleLogout}>
             <Link to="#">Logout</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className="cart">
        <div
          className="header-cart-container"
          onClick={() => navigate("/cart")}
        >
          <i
            className="fa-solid fa-cart-shopping fa-flip-horizontal"
            style={{ color: "#ff4d4d", fontSize: "40px" }}
          ></i>
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
