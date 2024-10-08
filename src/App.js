import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import EnquiryForm from "./Components/EnquiryForm";
import Login from "./Components/Login";
import TermConditions from "./Components/TermConditions";
import "./Styles/app.css";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage if they exist
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Save cart items to localStorage whenever they change
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
        <Header cartCount={cartCount} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <>
                  <Shop
                    onAddToCart={handleAddToCart}
                    selectedCategory={selectedCategory}
                  />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              }
            />
            <Route
              path="enquiryForm"
              element={
                <EnquiryForm
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/terms-and-conditions" component={TermConditions} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
