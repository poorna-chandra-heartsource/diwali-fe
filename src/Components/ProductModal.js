import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import "../Styles/productModal.css";
import { formatPrice } from "../utils";
import config from "../config";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [giftBoxItems, setGiftBoxItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    if (product?.name) {
      setItemsLoading(true);
      const apiUrl = `${config.backendURL}/giftbox?name=${encodeURIComponent(
        product.name
      )}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const items = response.data.items || [];
          if (items.length > 0) {
            setGiftBoxItems(items);
          } else {
            setGiftBoxItems([]);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.warn(`No gift box items found for ${product.name}`);
            setGiftBoxItems([]);
          } else {
            console.error("Error fetching gift box items:", error);
          }
        })
        .finally(() => {
          setItemsLoading(false);
        });
    }
  }, [product?.name]);

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

  const handleInputFocus = () => {
    if (quantity === 0) {
      setQuantity("");
    }
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
            unit_price: product.unit_price,
            unit_of_sale: product.unit_of_sale,
            image: product.image,
          },
          quantity
        );

        setNotification("Added to Cart");
      }
      setLoading(false);

      setTimeout(() => {
        setNotification("");
      }, 3000);
    }, 500);
  };

  const subtotal = quantity * product.unit_price;
  if (!product) return null;

  return (
    <>
      {notification && <div className="notification">{notification}</div>}
      <div className="modal-overlay" onClick={onClose}>
        <div
          className={`modal-content ${
            giftBoxItems.length > 0 ? "modal-large" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
            &times;
          </button>

          <div className="modal-body">
            {/* Left side */}
            <div className="modal-left">
              <img
                src={product.image}
                alt={product.name}
                className="modal-image"
              />
              <div className="modal-info">
                <h2>{product.name}</h2>
                <p className="new-price">
                  ₹ {formatPrice(product.unit_price)}&nbsp;(
                  {product.unit_of_sale})
                </p>
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={handleDecrement}>
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                  />
                  <button className="quantity-btn" onClick={handleIncrement}>
                    +
                  </button>
                  <button
                    className="enquiry-btn"
                    onClick={handleAddtoCart}
                    disabled={loading || quantity === 0}
                  >
                    {loading ? <Spinner /> : "Add to Cart"}
                  </button>
                </div>
                {/* Display subtotal */}
                <p className="subtotal">Subtotal: ₹ {formatPrice(subtotal)}</p>
              </div>
            </div>

            {/* Right side: List of items */}
            {giftBoxItems.length > 0 && (
              <div className="modal-right">
                <h3>Items in this Gift Box:</h3>
                {itemsLoading ? (
                  <Spinner />
                ) : (
                  <table className="giftbox-items-table">
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {giftBoxItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item.product}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
