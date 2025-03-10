import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import bgVideo from "../assets/background.mp4";
import logo from "../assets/logo.jpeg"; // Import the logo

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    
    // Redirect to Dashboard on successful login
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Logo Positioned Above the Login Box */}
      <img src={logo} alt="Logo" className="login-logo" />

      {/* Login Box */}
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>

         

          <button type="submit">Login</button>
        </form>
{/* Forgot Password Link */}
<div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        <div className="SignUp-link">
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;