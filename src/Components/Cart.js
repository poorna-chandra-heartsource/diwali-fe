import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import "../Styles/cart.css";
import { formatPrice } from "../utils";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleRemoveItem = (name) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.name !== name)
    );
  };

  const handleIncreaseQuantity = (name) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === name && item.quantity < 100
          ? { ...item, quantity: item.quantity + 1 }
          : item
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

  const handleQuantityInputChange = (name, value) => {
    const newValue = Math.min(100, Math.max(1, Number(value)));
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === name ? { ...item, quantity: newValue } : item
      )
    );
  };

  const getSubtotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0
    );
  };

  // Adjusted function to return both the discount rate and percentage
  const calculateDiscount = (subtotal) => {
    if (subtotal >= 20000) return { rate: 0.15, percentage: 15 };
    if (subtotal >= 10001) return { rate: 0.1, percentage: 10 };
    if (subtotal >= 5000) return { rate: 0.05, percentage: 5 };
    return { rate: 0, percentage: 0 };
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotalPrice();
    const { rate } = calculateDiscount(subtotal);
    return subtotal * rate;
  };

  const getDiscountPercentage = () => {
    const subtotal = getSubtotalPrice();
    const { percentage } = calculateDiscount(subtotal);
    return percentage;
  };

  const getTotalPrice = () => {
    return getSubtotalPrice() - getDiscountAmount();
  };

  const handleConfirmEnquiry = () => {
    if (cartItems.length === 0) {
      setNotification({
        message:
          "Your cart is empty! Please add items to the cart before confirming an inquiry.",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 7000);
      return;
    }
    navigate("/enquiryForm");
  };

  return (
    <div className="cart-container">
      {notification.message && (
        <p
          className={`enquiry-notification ${
            notification.type === "success"
              ? "notification-success"
              : "notification-error"
          }`}
        >
          {notification.message}
        </p>
      )}
      <div className="cart-items-section">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <EmptyCart />
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
                    Price:&nbsp;₹ {formatPrice(item.unit_price)}
                  </p>
                  <div className="cart-item-price-quantity">
                    <div className="quantity-controls">
                      <button
                        className="decrease-btn"
                        onClick={() => handleDecreaseQuantity(item.name)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityInputChange(item.name, e.target.value)
                        }
                        min="1"
                        max="100"
                      />
                      <button
                        className="increase-btn"
                        onClick={() => handleIncreaseQuantity(item.name)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="cart-item-subtotal">
                    Subtotal: ₹{" "}
                    {formatPrice((item.unit_price || 0) * (item.quantity || 0))}
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
            <span>Budgeted Price</span>
            <span>₹ {formatPrice(getSubtotalPrice())}</span>
          </div>
          <div className="summary-item">
            <span>
              Discount (<b>{getDiscountPercentage()}%</b>)
            </span>
            <span>- ₹ {formatPrice(getDiscountAmount())}</span>
          </div>
          <div className="summary-item total">
            <span>Budgeted Total Price</span>
            <span>₹ {formatPrice(getTotalPrice())}</span>
          </div>
          <button className="proceed-btn" onClick={handleConfirmEnquiry}>
            Confirm Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
