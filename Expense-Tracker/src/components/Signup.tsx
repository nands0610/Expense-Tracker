import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate that the password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        username: name,
        email: email,
        password: password,
      });
      // Store token and username in localStorage
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      navigate("/dashboard", { state: { showMascot: true } });
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <h1>Expense Tracker</h1>
        <p>Take control of your expenses with ease!</p>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <div className="signup-card">
          <h2>Sign Up</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSignup}>
            {/* Name Input */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaUser className="input-icon" />
            </div>

            {/* Email Input */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="input-icon" />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="input-icon" />
            </div>

            {/* Confirm Password Input */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="input-icon" />
            </div>

            {/* Sign Up Button */}
            <button className="signup-btn" type="submit">
              Sign Up
            </button>
          </form>

          {/* Already have an account? */}
          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
