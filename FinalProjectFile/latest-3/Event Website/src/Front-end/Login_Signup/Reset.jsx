import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./confirmPassChange.css";

const ResetPassword = () => {
  const [newPassword, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      // Send a request to your backend API to handle password reset
      const response = await axios.post(
        "http://localhost:8081/api/passChangeUpdate",
        {
          password,
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
          <p className="title">Enter New Password</p>
          <form className="form" onSubmit={handleReset}>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
