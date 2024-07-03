import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./confirmPassChange.css";

const ConfirmPassChange = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async (event) => {
    event.preventDefault();
    try {
      // Send a request to your backend API to verify email
      const response = await axios.post(
        "http://localhost:8081/api/passChangeConfirm",
        {
          email,
          name,
        }
      );

      // If email verification is successful, navigate to reset password page
      console.log("Email verification successful:", response.data);
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      // Handle error: show error message to the user
      console.error("Email verification failed:", error.response.data);
      alert("Email verification failed. Please try again.");
    }
  };

  return (
    <>
      <div className="login">
        <div className="form-container">
          <p className="title">Reset Password</p>
          <form className="form" onSubmit={handleConfirm}>
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
              <label htmlFor="username">name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="forgot">
              <a rel="noopener noreferrer" href="/">
                return to login
              </a>
            </div>
            <button className="sign" type="submit">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassChange;
