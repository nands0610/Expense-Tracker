import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // import our API function
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Call loginUser with email and password
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", data.username);
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.response?.data?.error || "Login failed");
      }
    };

    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <h1>BudgetBytes</h1>
                <p>Manage your finances effortlessly with our smart tracking system.</p>
            </div>

            {/* Right Section */}
            <div className="login-right">
                <div className="login-card">
                    <h2>Log In</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleLogin}>

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
                            placeholder="Your Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
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
                    <button className="login-btn" type="submit">Log In</button>
                </form>

                    {/* Signup Link */}
                    <p className="signup-link">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
