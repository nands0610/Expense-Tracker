import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface NewPlanModalProps {
    show: boolean;
    handleClose: () => void;
}

const NewPlanModal: React.FC<NewPlanModalProps> = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered className="expense-modal">
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-custom">📅 Add New Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Name of Plan */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Plan Name</Form.Label>
                        <Form.Control type="text" placeholder="E.g., Goa Trip, Laptop Upgrade" className="form-control-custom" />
                    </Form.Group>

                    {/* Estimated Cost */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Estimated Cost (₹)</Form.Label>
                        <Form.Control type="number" placeholder="Enter estimated amount" className="form-control-custom" />
                    </Form.Group>

                    {/* Date of Plan */}
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Expected Date</Form.Label>
                        <Form.Control type="date" className="form-control-custom" />
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
                <Button variant="primary" onClick={handleClose} className="btn-add-expense">📅 Add Plan</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewPlanModal;
