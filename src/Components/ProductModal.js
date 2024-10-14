import React, { useState } from "react";
import Spinner from "./Spinner";
import "../Styles/productModal.css";
import { formatPrice } from "../utils";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  if (!product) return null;

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setQuantity(value);
  };

  const handleAddtoCart = () => {
    setLoading(true);
    setNotification("");
    setTimeout(() => {
      if (onAddToCart && quantity > 0) {
        onAddToCart(
          {
            _id: product._id,
            name: product.name,
            rate_in_rs: product.rate_in_rs,
            image: product.image,
          },
          quantity
        );

        setNotification("Added to Cart");
      }
      setLoading(false);
      // Remove notification after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <div className="modal-info">
          <h2>{product.name}</h2>
          <p className="new-price">₹ {formatPrice(product.rate_in_rs)}</p>

          <div className="quantity-control">
            <button className="quantity-btn" onClick={handleDecrement}>
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={handleInputChange}
              onFocus={() => quantity === 0 && setQuantity("")}
              onBlur={() => quantity === "" && setQuantity(0)}
              min="0"
              max="100"
            />

            <button className="quantity-btn" onClick={handleIncrement}>
              +
            </button>

            <button
              className="enquiry-btn"
              onClick={handleAddtoCart}
              disabled={loading}
            >
              {loading ? <Spinner /> : " Add to Cart"}
            </button>
          </div>
          {/* Notification Message display */}
          {notification && <div className="notification">{notification}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
