import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/header.css";

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">Diwali Celebrations</a>
      </div>
      <nav>
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
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
