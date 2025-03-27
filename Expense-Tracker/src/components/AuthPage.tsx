import { useState } from "react";
import { motion } from "framer-motion";
import "./AuthPage.css";

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="auth-container">
            {/* Background Section */}
            <div className="auth-background">
                <h1>Expense Tracker</h1>
                <p>Track your spending, plan your goals!</p>
            </div>

            {/* Sliding Login & Sign-Up Card */}
            <motion.div
                className="auth-card"
                initial={{ x: 300 }}  // Start from right
                animate={{ x: isSignUp ? -300 : 0 }}  // Move left when sign up
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />

                    {isSignUp && (
                        <>
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm your password" />
                        </>
                    )}

                    <button className="auth-button">{isSignUp ? "Sign Up" : "Log In"}</button>
                </form>

                <motion.p
                    onClick={() => setIsSignUp(!isSignUp)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="switch-text"
                >
                    {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AuthPage;
