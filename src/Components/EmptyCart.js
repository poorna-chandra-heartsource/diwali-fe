import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/emptyCart.css";

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  };

  return (
    <div className="empty-cart-container" onClick={handleClick}>
      <div className="cart-image">
        <img src="/Images/emptyCart.png" alt="Diwlai-Empty-Cart" />
      </div>
      <h2>Hey, your cart feels empty!</h2>
      <p>Let's fill it with something special.</p>
    </div>
  );
};

export default EmptyCart;
