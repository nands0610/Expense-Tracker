import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./Settings.css";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "enabled";
    });

    const [notifications, setNotifications] = useState(true);
    const [currency, setCurrency] = useState("INR");
    const [name, setName] = useState("Nanditha S");
    const [email, setEmail] = useState("nanditha@example.com");
    const [currentPassword, setCurrentPassword] = useState(""); // Added field
    const [newPassword, setNewPassword] = useState("");

    // Apply dark mode class
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    }, [darkMode]);

    return (
        <div className="settings-container">
            <h2 className="section-title">⚙️ Settings</h2>

            {/* Appearance */}
            <Card className="settings-card">
                <Card.Body>
                    <h5>🌓 Appearance</h5>
                    <Form.Check
                        type="switch"
                        id="darkMode"
                        label="Enable Dark Mode"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                </Card.Body>
            </Card>

            {/* Notifications */}
            <Card className="settings-card">
                <Card.Body>
                    <h5>🔔 Notifications</h5>
                    <Form.Check
                        type="switch"
                        id="notifications"
                        label="Receive Email Notifications"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                    />
                </Card.Body>
            </Card>

            {/* Account Details */}
            <Card className="settings-card">
                <Card.Body>
                    <h5>👤 Account Details</h5>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" className="mt-3">Save Changes</Button>
                </Card.Body>
            </Card>

            {/* Change Password */}
            <Card className="settings-card">
                <Card.Body>
                    <h5>🔒 Change Password</h5>

                    <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary">Update Password</Button>
                </Card.Body>
            </Card>

            {/* Currency */}
            <Card className="settings-card">
                <Card.Body>
                    <h5>💰 Currency</h5>
                    <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="INR">🇮🇳 INR (₹)</option>
                        <option value="USD">🇺🇸 USD ($)</option>
                        <option value="EUR">🇪🇺 EUR (€)</option>
                        <option value="GBP">🇬🇧 GBP (£)</option>
                    </Form.Select>
                </Card.Body>
            </Card>

            {/* Danger Zone */}
            <Card className="settings-card danger-zone">
                <Card.Body>
                    <h5>⚠️ Danger Zone</h5>
                    <p>Deleting your account is irreversible. Proceed with caution.</p>
                    <Button variant="danger">Delete Account</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Settings;
