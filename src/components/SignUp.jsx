import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ Import axios
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBirthdayCake } from "react-icons/fa";
import "./SignUp.css";
import bgVideo from "../assets/background.mp4";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    gender: ""
  });

  const [error, setError] = useState(""); // ✅ To display error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup Success:", response.data);

      alert("Signup Successful!");
      navigate("/dashboard"); // Redirect to Dashboard after successful signup
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="SignUp-container">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* SignUp Form */}
      <div className="SignUp-box">
        <h2>SignUp</h2>
        {error && <p className="error-message">{error}</p>} {/* ✅ Display error message */}
        <form onSubmit={handleSignUp}>
          <div className="input-container">
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
            <FaUser className="icon" />
          </div>

          <div className="input-container">
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-container">
            <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
            <FaLock className="icon" />
          </div>

          <div className="input-container">
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            <FaBirthdayCake className="icon" />
          </div>

          <div className="input-container">
            <input type="tel" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} required />
            <FaPhone className="icon" />
          </div>

          <div className="gender">
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit">SignUp</button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
