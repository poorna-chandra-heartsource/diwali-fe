import React from "react";
import "../Styles/emptyCart.css";

const EmptyCart = () => {
  return (
    <div className="empty-cart-container">
      <div className="cart-image">
        <img src="/Images/emptyCart.png" alt="Empty Cart" />
      </div>
      <h2>Hey, your cart feels empty!</h2>
      <p>Let's fill it with something special.</p>
    </div>
  );
};

export default EmptyCart;
