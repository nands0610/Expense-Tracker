import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface NewGoalModalProps {
    show: boolean;
    handleClose: () => void;
}

const NewGoalModal: React.FC<NewGoalModalProps> = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered className="expense-modal">
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-custom">🎯 Set a New Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Goal Name */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Goal Name</Form.Label>
                        <Form.Control type="text" placeholder="E.g., Buy a Laptop, Travel Fund" className="form-control-custom" />
                    </Form.Group>

                    {/* Target Amount */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Target Amount (₹)</Form.Label>
                        <Form.Control type="number" placeholder="Enter savings target" className="form-control-custom" />
                    </Form.Group>

                    {/* Deadline */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Deadline</Form.Label>
                        <Form.Control type="date" className="form-control-custom" />
                    </Form.Group>

                    {/* Priority Level */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Priority</Form.Label>
                        <Form.Select className="form-control-custom">
                            <option value="high">🔥 High</option>
                            <option value="medium">⚡ Medium</option>
                            <option value="low">⏳ Low</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose} className="btn-cancel">Cancel</Button>
                <Button variant="primary" onClick={handleClose} className="btn-add-expense">🎯 Set Goal</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewGoalModal;
