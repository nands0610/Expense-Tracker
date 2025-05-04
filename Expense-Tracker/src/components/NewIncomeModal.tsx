import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addIncome } from "../api";

interface NewIncomeModalProps {
  show: boolean;
  handleClose: () => void;
  triggerConfetti: () => void;
<<<<<<< HEAD
  triggerMascot: () => void;  // New prop to trigger mascot
}

const NewIncomeModal: React.FC<NewIncomeModalProps> = ({ show, handleClose, triggerConfetti, triggerMascot }) => {
=======
  triggerIncomeMascot: () => void;  // New prop
}

const NewIncomeModal: React.FC<NewIncomeModalProps> = ({ show, handleClose, triggerConfetti, triggerIncomeMascot }) => {
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (submitted) return;

    try {
      const response = await addIncome({ date, amount, source, description });
      setMessage(response.message);
      setSubmitted(true);
      triggerConfetti();
<<<<<<< HEAD
      triggerMascot(); // Show mascot when income is added successfully

=======
      triggerIncomeMascot();  // Trigger the income mascot
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)
      setTimeout(() => {
        setSubmitted(false);
        setMessage("");
        handleClose();
      }, 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to add income.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="income-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title-custom">New Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitted ? (
          <div className="text-center fade-in">✅ Income Added Successfully!</div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Income Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount received"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Source of Income</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g., Salary, Freelancing, Gift"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Received</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
        {message && <p>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={submitted}>
          Add Income
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewIncomeModal;
