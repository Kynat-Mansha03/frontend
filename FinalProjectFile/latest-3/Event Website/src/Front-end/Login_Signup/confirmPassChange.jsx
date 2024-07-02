import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./confirmPassChange.css";

const ConfirmPassChange = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      // Send a request to your backend API to handle password reset
      const response = await axios.post(
        "http://localhost:8081/api/reset-password",
        {
          email,
          username,
        }
      );

      // Handle success: show confirmation message and navigate back to login
      console.log("Password reset request sent:", response.data);
      alert("Password reset request sent! Check your email."); // Notify the user
      navigate("/login"); // Navigate back to the login page after successful reset
    } catch (error) {
      // Handle error: show error message to the user
      console.error("Password reset request failed:", error.response.data);
      alert("Password reset request failed. Please try again.");
    }
  };

  return (
    <>
      <div className="login">
        <div className="form-container">
          <p className="title">Reset Password</p>
          <form className="form" onSubmit={handleReset}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="forgot">
              <a rel="noopener noreferrer" href="/">
                return to login
              </a>
            </div>
            <button className="sign" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassChange;
