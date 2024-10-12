import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/orderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;
  const userName = location.state?.userName;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/orders/fetch?sort_field=serial_number&sort_order=asc&page=1&limit=70",
          { user_id: userId }
        );
        setOrders(response.data.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleOrderClick = (orderId) => {
    navigate("/order-details", { state: { orderId } });
  };

  return (
    <div className="order-details-container">
      <h3>Welcome, {userName}</h3>
      <h3>Order List</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="order-grid">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="order-item"
              onClick={() => handleOrderClick(order._id)}
              style={{ cursor: "pointer" }}
            >
              <div className="order-product-info">
                <div className="order-description">
                  <h3>Order ID: {order._id}</h3>
                  <p>Total Price: ₹ {order.total_price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
