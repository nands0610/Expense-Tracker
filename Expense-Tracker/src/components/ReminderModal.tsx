import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addReminder } from "../api";

interface ReminderModalProps {
  show: boolean;
  onClose: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ show, onClose }) => {
  const [reminderName, setReminderName] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await addReminder({
        title: reminderName,
        due_date: reminderDate, // assuming the backend expects due_date as YYYY-MM-DD
        time: reminderTime // if your backend supports time, else you can remove it
      });
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to add reminder.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Reminder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reminder"
              value={reminderName}
              onChange={(e) => setReminderName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
        {message && <p>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Reminder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReminderModal;