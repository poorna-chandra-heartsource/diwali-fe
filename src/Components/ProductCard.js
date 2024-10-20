import React, { useState } from "react";
import Spinner from "./Spinner";
import "../Styles/productCard.css";
import { formatPrice } from "../utils";

const ProductCard = ({
  _id,
  name,
  unit_price,
  unit_of_sale,
  image,
  onAddToCart,
}) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setLoading(true);
    setNotification("");

    setTimeout(() => {
      if (onAddToCart) {
        onAddToCart({ _id, name, unit_price, unit_of_sale, image }, 1);
        setNotification("Added to Cart");
      }
      setLoading(false);
      //remove notification
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }, 500);
  };

  return (
    <>
      {" "}
      {notification && <div className="notification">{notification}</div>}
      <div className="product-card">
        <img src={image} alt={name} />
        <div className="product-info">
          <p className="product-name">{name}</p>
          <p className="new-price">
            ₹ {formatPrice(unit_price)}&nbsp;({unit_of_sale})
          </p>
        </div>

        <button
          className="enquiry-btn"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Add to Cart"}
        </button>
      </div>
    </>
  );
};

export default ProductCard;
