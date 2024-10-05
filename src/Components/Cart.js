import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/cart.css";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const handleRemoveItem = (name) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.name !== name)
    );
  };

  const handleIncreaseQuantity = (name) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (name) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getSubtotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.rate_in_rs * item.quantity,
      0
    );
  };

  const handleConfirmEnquiry = () => {
    navigate("/enquiryForm");
  };

  return (
    <div className="cart-container">
      <div className="cart-items-section">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">
                    Price:&nbsp;₹{item.rate_in_rs}
                  </p>
                  <div className="cart-item-price-quantity">
                    <div className="quantity-controls">
                      <button
                        className="decrease-btn"
                        onClick={() => handleDecreaseQuantity(item.name)}
                      >
                        -
                      </button>
                      &nbsp;
                      <span className="quantity">{item.quantity}</span>
                      &nbsp;
                      <button
                        className="increase-btn"
                        onClick={() => handleIncreaseQuantity(item.name)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="cart-item-subtotal">
                    Subtotal: ₹{item.rate_in_rs * item.quantity}
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveItem(item.name)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-summary-section">
        <div className="cart-summary">
          <h3>Cart Totals</h3>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{getSubtotalPrice()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>Delivery Charge Applicable</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>₹{getSubtotalPrice()}</span>
          </div>
          <button className="proceed-btn" onClick={handleConfirmEnquiry}>
            Confirm Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
