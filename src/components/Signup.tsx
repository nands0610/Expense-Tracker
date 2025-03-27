import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();

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

                    {/* Name Input */}
                    <div className="input-group">
                        <input type="text" placeholder="Your Name" />
                        <FaUser className="input-icon" />
                    </div>

                    {/* Email Input */}
                    <div className="input-group">
                        <input type="email" placeholder="Your Email" />
                        <FaEnvelope className="input-icon" />
                    </div>

                    {/* Password Input */}
                    <div className="input-group">
                        <input type="password" placeholder="Create Password" />
                        <FaLock className="input-icon" />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="input-group">
                        <input type="password" placeholder="Confirm Password" />
                        <FaLock className="input-icon" />
                    </div>

                    {/* Sign Up Button */}
                    <button className="signup-btn" onClick={() => navigate('/dashboard')}>
                        Sign Up
                    </button>

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
