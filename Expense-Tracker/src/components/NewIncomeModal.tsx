import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface NewIncomeModalProps {
    show: boolean;
    handleClose: () => void;
    triggerConfetti: () => void; // ✅ Added prop
}

const NewIncomeModal: React.FC<NewIncomeModalProps> = ({ show, handleClose, triggerConfetti }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        triggerConfetti(); // 🎉 Trigger full-screen confetti

        setTimeout(() => {
            setSubmitted(false);
            handleClose();
        }, 3000); // Closes modal after 3 seconds
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>New Income</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {submitted ? (
                    <div className="text-center fade-in">
                        ✅ Income Added Successfully!
                    </div>
                ) : (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Income Amount (₹)</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount received" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Source of Income</Form.Label>
                            <Form.Control type="text" placeholder="E.g., Salary, Freelancing, Gift" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date Received</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter details" />
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Add Income</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewIncomeModal;
