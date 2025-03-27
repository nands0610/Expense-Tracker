import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  // Local settings state
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "enabled");
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState("INR");

  // Profile state fetched from the backend
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fields for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Messages for user feedback
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Fetch user profile details on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Assuming the backend returns an object with "username" and "email"
        setName(response.data.username || "");
        setEmail(response.data.email || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Manage dark mode class on body and store setting in localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  // Handle profile update (username and email)
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://127.0.0.1:5000/updateProfile",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileMessage("Profile updated successfully.");
      // Optionally update localStorage if you store username globally
      localStorage.setItem("username", response.data.username);
    } catch (err: any) {
      setProfileMessage("Failed to update profile.");
    }
  };

  // Handle password update
  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://127.0.0.1:5000/updatePassword",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMessage("Password updated successfully.");
      // Clear password fields after a successful update
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPasswordMessage("Failed to update password.");
    }
  };

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
          {profileMessage && <Alert variant="info">{profileMessage}</Alert>}
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
          <Button variant="primary" className="mt-3" onClick={handleUpdateProfile}>
            Save Changes
          </Button>
        </Card.Body>
      </Card>

      {/* Change Password */}
      <Card className="settings-card">
        <Card.Body>
          <h5>🔒 Change Password</h5>
          {passwordMessage && <Alert variant="info">{passwordMessage}</Alert>}
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
          <Button variant="primary" onClick={handleUpdatePassword}>
            Update Password
          </Button>
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
