import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
// import SideBar from "./Components/SideBar";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import EnquiryForm from "./Components/EnquiryForm";
import "./Styles/app.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

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
                  {/* <SideBar onCategorySelect={handleCategorySelect} /> */}
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
              element={<EnquiryForm cartItems={cartItems} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
