import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Back-end/Header";
import Homepage from "./Front-end/homepage";
import Footer from "./Back-end/Footer";
import Login from "./Front-end/Login_Signup/Login";
import Signup from "./Front-end/Login_Signup/Signup";
import "./App.css";
import Describe from "./Front-end/Decsribe/Describe.jsx";
import ConfirmPassChange from "./Front-end/Login_Signup/confirmPassChange.jsx";
import ResetPassword from "./Front-end/Login_Signup/Reset.jsx";

//created a routing path into the application
//calling the header which uses the link to navigate to the different pages through route paths
//calling the routes

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/describe" element={<Describe />} />
            <Route path="/confirmPassChange" element={<ConfirmPassChange />} />
            <Route path="/reset" element={<ResetPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
