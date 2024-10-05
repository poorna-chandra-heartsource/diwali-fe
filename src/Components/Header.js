import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/header.css";

const Header = ({ cartCount }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">Diwali Celebrations</div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </nav>
      <div className="cart">
        <div
          className="header-cart-container"
          onClick={() => navigate("/cart")}
        >
          <i
            class="fa-solid fa-cart-shopping fa-flip-horizontal"
            style={{ color: "#003366", fontSize: "40px" }}
          ></i>
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
