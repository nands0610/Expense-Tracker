import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface NewExpenseModalProps {
    show: boolean;
    handleClose: () => void;
}

const NewExpenseModal: React.FC<NewExpenseModalProps> = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered className="expense-modal">
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-custom">💸 Add New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Amount */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Amount Spent (₹)</Form.Label>
                        <Form.Control type="number" placeholder="Enter amount" className="form-control-custom" />
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Category</Form.Label>
                        <Form.Select className="form-control-custom">
                            <option value="Food">🍔 Food</option>
                            <option value="Transport">🚗 Transport</option>
                            <option value="Entertainment">🎬 Entertainment</option>
                            <option value="Bills">📜 Bills</option>
                            <option value="Shopping">🛍 Shopping</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter details" className="form-control-custom" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose} className="btn-cancel">Cancel</Button>
                <Button variant="primary" onClick={handleClose} className="btn-add-expense">➕ Add Expense</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewExpenseModal;
