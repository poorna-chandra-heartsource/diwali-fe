import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/orderList.css";
import config from "../config";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId || localStorage.getItem("userId");
  const userName = location.state?.userName || localStorage.getItem("userName");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let token = localStorage.getItem("token");
        const headerConfig = {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
        const response = await axios.post(
          `${config.backendURL}/orders/fetch?sort_field=serial_number&sort_order=asc&page=1&limit=70`,
          {},
          headerConfig
        );
        setOrders(response.data.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          navigate("/login");
        } else {
          setError("Failed to fetch orders. Please try again.");
        }
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
      <h3>Inquiry List</h3>
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
                  <h3>Inquiry ID: {order._id}</h3>
                  <p>Total Budgeted Price: ₹ {order.total_price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Inquiry available</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
