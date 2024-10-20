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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
    closeMenu();
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/" onClick={closeMenu}>
          Diwali Inquiries
        </a>
      </div>
      <nav>
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="/" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/products" onClick={closeMenu}>
              Products
            </a>
          </li>
          {isLoggedIn && (
            <li>
              <a href="/order-list" onClick={closeMenu}>
                Inquiries
              </a>
            </li>
          )}
          {isLoggedIn ? (
            <li onClick={handleLogout}>
             <Link to="#">Logout</Link>
            </li>
          ) : (
            <li>
              <a href="/login" onClick={closeMenu}>
                Login
              </a>
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
          onClick={() => {
            navigate("/cart");
            closeMenu();
          }}
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
