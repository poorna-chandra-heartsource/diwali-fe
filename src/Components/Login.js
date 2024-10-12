import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/login.css";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required *";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "*Please fill valid email Id";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required *";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      let { token, id, firstName } = response.data;

      localStorage.setItem("token", token);

      setNotification({
        message: "Login successful!",
        type: "success",
      });
      setIsLoggedIn(true);
      setFormData({
        email: "",
        password: "",
      });

      navigate("/order-list", { state: { userId: id, userName: firstName } });
    } catch (error) {
      setNotification({
        message: "Failed to login. Please try again.",
        type: "error",
      });
    }

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-underline"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email" className="emailId">
            Email address *
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Id"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error-input" : ""}
            style={{
              border: errors.email ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-container">
          <label htmlFor="password" className="pwd">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? "error-input" : ""}
            style={{
              border: errors.password ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="login-options">
          <button type="submit" className="login-button">
            Log in
          </button>
        </div>
      </form>

      {notification.message && (
        <p
          className={`notification ${
            notification.type === "success"
              ? "notification-success"
              : "notification-error"
          }`}
        >
          {notification.message}
        </p>
      )}

      <Link to="/forgot-password" className="forgot-password-link">
        Forgot password?
      </Link>
    </div>
  );
};

export default Login;