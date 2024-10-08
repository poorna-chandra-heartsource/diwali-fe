import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    // Load the cart count from localStorage to persist it between reloads

    const savedCount = localStorage.getItem("cartCount");
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    // Save the cart count to localStorage whenever it changes
    localStorage.setItem("cartCount", cartCount);
  }, [cartCount]);

  const addToCart = (quantity = 1) => {
    setCartCount((prevCount) => prevCount + quantity);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
