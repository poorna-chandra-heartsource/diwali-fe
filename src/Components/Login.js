import React from "react";
import "../Styles/login.css";

function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-underline"></div>
      <form className="login-form">
        <div className="input-container">
          <label htmlFor="username" className="emailId">
            Email address *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email Id"
            required
          />
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
            required
          />
        </div>
        <div className="login-options">
          <button type="submit" className="login-button">
            Log in
          </button>
        </div>
      </form>
      <a href="/forgot-password" className="forgot-password-link">
        Forgot password?
      </a>
    </div>
  );
}

export default Login;
