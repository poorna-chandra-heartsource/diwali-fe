// import React from "react";
// import "../Styles/orderDetails.css";

// const OrderDetails = ({ orders }) => {
//   return (
//     <div className="order-details-container">
//       <h3>Your Inquiry Details</h3>
//       {orders.map((order, index) => (
//         <div key={index} className="order-item">
//           <div className="order-product-info">
//             <img src={order.image} alt={order.name} className="order-image" />
//             <div className="order-description">
//               <h3>{order.name}</h3>
//               <p>Quantity: {order.quantity}</p>
//               <p>Subtotal: ₹{order.subtotal}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderDetails;

import React from "react";
import "../Styles/orderDetails.css";

const OrderDetails = ({ orders }) => {
  // Split the orders into two halves
  const middleIndex = Math.ceil(orders.length / 2);
  const leftOrders = orders.slice(0, middleIndex);
  const rightOrders = orders.slice(middleIndex);

  return (
    <div className="order-details-container">
      <h3>Your Inquiry Details</h3>
      <div className="order-grid">
        {/* Left Column */}
        <div className="order-column">
          {leftOrders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-product-info">
                <img
                  src={order.image}
                  alt={order.name}
                  className="order-image"
                />
                <div className="order-description">
                  <h3>{order.name}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <p>Subtotal: ₹{order.subtotal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="order-column">
          {rightOrders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-product-info">
                <img
                  src={order.image}
                  alt={order.name}
                  className="order-image"
                />
                <div className="order-description">
                  <h3>{order.name}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <p>Subtotal: ₹{order.subtotal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
