import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import backgroundImage from "../assets/dash.jpeg"; // Import the image

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  // Function to generate a random 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const handleSendOTP = () => {
    if (email.trim() === "") {
      alert("Please enter your email.");
      return;
    }

    const generatedOtp = generateOtp();
    setSentOtp(generatedOtp);
    setShowOtpField(true);

    alert(`OTP sent to ${email}: ${generatedOtp}`); // Simulate OTP (Replace with API call)
  };

  const handleVerifyOTP = () => {
    if (otp === sentOtp.toString()) {
      alert("OTP Verified Successfully!");
      navigate("/reset-password"); // Redirect to Reset Password page
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div
      className="forgot-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgot-input"
          required
        />
        <button onClick={handleSendOTP} className="forgot-btn">
          Send OTP
        </button>

        {showOtpField && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="otp-input"
              required
            />
            <button onClick={handleVerifyOTP} className="verify-btn">
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
