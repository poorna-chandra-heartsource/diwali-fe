import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/forgotPassword.css";
import config from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${config.backendURL}/auth/forgot-password`,
        {
          email: email,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Password reset instructions have been sent to your email.");

        // navigate to login
        setTimeout(() => navigate("/login"), 5000);
      } else {
        setError("Failed to send password reset request.");
      }
    } catch (err) {
      setError("Failed to send reset instructions. Please try again.");
      console.error(err);
    }
  };

  const handleBackClick = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-password-card">
      <h3 className="subtitle">Forgot Your Password?</h3>
      <p className="instructions">
        Please enter the email address associated with your Diwali Inquiries
        Account, then check your email for password reset instructions.
      </p>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="reset-button">
          Send
        </button>
      </form>

      {/* Display success or error messages */}
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <button onClick={handleBackClick} className="back-link">
        Back
      </button>
    </div>
  );
};

export default ForgotPassword;
