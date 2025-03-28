import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface ReminderModalProps {
    show: boolean;
    onClose: () => void;
    onAddReminder: (name: string, date: string, time: string) => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ show, onClose, onAddReminder }) => {
    const [reminderName, setReminderName] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [reminderTime, setReminderTime] = useState("");

    const handleAdd = () => {
        if (reminderName && reminderDate && reminderTime) {
            onAddReminder(reminderName, reminderDate, reminderTime);
            setReminderName("");
            setReminderDate("");
            setReminderTime("");
            onClose();
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
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={reminderDate}
                            onChange={(e) => setReminderDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    Add Reminder
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReminderModal;
