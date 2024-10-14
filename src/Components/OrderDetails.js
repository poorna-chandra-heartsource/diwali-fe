import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/orderDetails.css";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();

  const orderId = location.state?.orderId;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        let token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
        const response = await axios.get(
          `http://127.0.0.1:3001/orders/${orderId}`,
          config
        );
        setOrder(response.data);
      } catch (err) {
        setError("Failed to fetch order details. Please try again.");
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="order-details-container">
      <h3>Order Details</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="order-summary">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{order.total_price}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.created_dt).toLocaleDateString()}
        </p>
      </div>
      <h3>Items in Order</h3>
      <div className="order-grid">
        {order.orderItems.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-product-info">
              <div className="order-description">
                <h3>{item.productName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackClick}>
        Back to Order List
      </button>
    </div>
  );
};

export default OrderDetails;
