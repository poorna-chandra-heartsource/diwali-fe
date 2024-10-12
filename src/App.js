import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import EnquiryForm from "./Components/EnquiryForm";
import Login from "./Components/Login";
import TermConditions from "./Components/TermConditions";
import OrderDetails from "./Components/OrderDetails";
import OrderList from "./Components/OrderList";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import UserEnquiry from "./Components/UserEnquiry";
import "./Styles/app.css";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity }];
      }
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app">
        <Header
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Shop
                  onAddToCart={handleAddToCart}
                  selectedCategory={selectedCategory}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              }
            />

            <Route
              path="/enquiryForm"
              element={
                isLoggedIn ? (
                  <UserEnquiry
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                ) : (
                  <EnquiryForm
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                )
              }
            />

            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/terms-and-conditions" element={<TermConditions />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
