import React, { useState } from "react";
import axios from "axios";
import "./dashboard.css"; // Import your CSS file here

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [challenge, setChallenge] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [c, setC] = useState("");
  const [z, setZ] = useState("");
  const [result, setResult] = useState("");
  const [isServiceEnabled, setIsServiceEnabled] = useState(true);

  const handleGenerateChallenge = async () => {
    if (!isServiceEnabled) {
      setResult("Service is currently disabled");
      return;
    }
    try {
      // Replace with your actual endpoint
      const response = await axios.post(
        "http://localhost:3001/generate-challenge",
        { username }
      );
      setChallenge(response.data.challenge);
    } catch (error) {
      console.error("Error generating challenge:", error);
    }
  };

  const handleVerify = async () => {
    if (!isServiceEnabled) {
      setResult("Service is currently disabled");
      return;
    }
    try {
      // Replace with your actual endpoint
      const response = await axios.post("http://localhost:3001/verify", {
        username,
        publicKey,
        c,
        z,
      });
      setResult(response.data.success ? "Success" : "Failure");
    } catch (error) {
      console.error("Error verifying:", error);
    }
  };

  const handleToggleService = () => {
    setIsServiceEnabled(!isServiceEnabled);
  };

  return (
    <div className="dashboard">
      <div className="app-bar">
        <h1>API Dashboard</h1>
      </div>
      <div className="container">
        <div className="section">
          <div className="paper">
            <h2>API Integration Guide</h2>
            <p>
              To integrate this API into your existing website, follow these
              steps:
            </p>
            <ol>
              <li>Install the required dependencies:</li>
              <pre className="codeBlock">
                <code>npm install axios</code>
              </pre>
              <li>Use the following code to interact with the API:</li>
              <pre className="codeBlock">
                <code>{`
import axios from 'axios';

// Generate challenge
const generateChallenge = async (username) => {
  const response = await axios.post('http://localhost:3001/generate-challenge', { username });
  return response.data.challenge;
};

// Verify authentication
const verifyAuthentication = async (username, publicKey, c, z) => {
  const response = await axios.post('http://localhost:3001/verify', { username, publicKey, c, z });
  return response.data.success;
};
                `}</code>
              </pre>
            </ol>
          </div>
        </div>
        <div className="section">
          <div className="paper">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Challenge"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
              />
              <input
                type="text"
                placeholder="Public Key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="C"
                value={c}
                onChange={(e) => setC(e.target.value)}
              />
              <input
                type="text"
                placeholder="Z"
                value={z}
                onChange={(e) => setZ(e.target.value)}
              />
              <button className="btn" onClick={handleGenerateChallenge}>
                Generate Challenge
              </button>
              <button className="btn" onClick={handleVerify}>
                Verify
              </button>
            </form>
            {result && <div className="alert">{result}</div>}
            <div className="toggle">
              <label>
                Enable Service
                <input
                  type="checkbox"
                  checked={isServiceEnabled}
                  onChange={handleToggleService}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
