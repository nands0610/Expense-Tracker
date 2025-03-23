import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <h1>Expense Tracker</h1>
                <p>Manage your finances effortlessly with our smart tracking system.</p>
            </div>

            {/* Right Section */}
            <div className="login-right">
                <div className="login-card">
                    <h2>Log In</h2>

                    {/* Email Input */}
                    <div className="input-group">
                        <input type="email" placeholder="Your Email" />
                        <FaEnvelope className="input-icon" />
                    </div>

                    {/* Password Input */}
                    <div className="input-group">
                        <input type="password" placeholder="Your Password" />
                        <FaLock className="input-icon" />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="login-options">
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button className="login-btn" onClick={() => navigate('/dashboard')}>Log In</button>

                    {/* Signup Link */}
                    <p className="signup-link">
                        Don't have an account? <a href="#">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
