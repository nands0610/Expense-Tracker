import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addGoal } from "../api";

interface NewGoalModalProps {
  show: boolean;
  handleClose: () => void;
}

const NewGoalModal: React.FC<NewGoalModalProps> = ({ show, handleClose }) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await addGoal({ goal_name: goalName, target_amount: targetAmount, deadline });
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
        handleClose();
      }, 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to add goal.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="goal-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title-custom">🎯 Set a New Goal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Goal Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g., Buy a Laptop, Travel Fund"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="form-control-custom"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Target Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter savings target"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="form-control-custom"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Deadline</Form.Label>
            <Form.Control
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
        </Form>
        {message && <p>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose} className="btn-cancel">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} className="btn-add-goal">
          🎯 Set Goal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewGoalModal;
