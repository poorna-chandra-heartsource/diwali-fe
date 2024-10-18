import React, { useEffect, useState } from "react";
import axios from "axios";
import EnquiryForm from "./EnquiryForm";
import config from "../config";

const UserEnquiry = ({ cartItems, setCartItems }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${config.backendURL}/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <EnquiryForm
      cartItems={cartItems}
      setCartItems={setCartItems}
      userData={userData}
    />
  );
};

export default UserEnquiry;
