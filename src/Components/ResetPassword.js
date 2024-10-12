import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/resetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/reset-password",
        {
          password: password,
        }
      );

      if (response.status === 200) {
        setSuccess("Password has been reset successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-title">Reset Password</h2>
      <div className="reset-underline"></div>
      <form className="reset-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">Confirm Password *</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>

      <button className="back-link" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
};

export default ResetPassword;
