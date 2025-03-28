import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addExpense } from "../api";
import Mascot from "./OverbudgetMascot";

interface NewExpenseModalProps {
  show: boolean;
  handleClose: () => void;
}

const NewExpenseModal: React.FC<NewExpenseModalProps> = ({ show, handleClose }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [showMascot, setShowMascot] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await addExpense({ date, amount, description, category });
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
        handleClose();
      }, 2000)
      {showMascot && <Mascot show={showMascot} />};
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to add expense.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="expense-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title-custom">💸 Add New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Amount Spent (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control-custom"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control-custom"
              required
            >
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Bills">📜 Bills</option>
              <option value="Shopping">🛍 Shopping</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control-custom"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control-custom"
              required
            />
          </Form.Group>
        </Form>
        {message && <p>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose} className="btn-cancel">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} className="btn-add-expense">
          ➕ Add Expense
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewExpenseModal;