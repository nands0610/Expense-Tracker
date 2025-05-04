import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { getReminders, removeReminder } from "../api"; // API calls
import "./RemindersTab.css"; // Add CSS for styling

interface Reminder {
    id: string;
    name: string;
    date: string;
}

const RemindersTab: React.FC = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);

    // Fetch reminders when the component loads
    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await getReminders();
            setReminders(response);
        } catch (error) {
            console.error("Error fetching reminders:", error);
        }
    };

    // Remove reminder from list & API
    const handleRemove = async (id: string) => {
        try {
            await removeReminder(id);
            setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
        } catch (error) {
            console.error("Error removing reminder:", error);
        }
    };

    // Check reminders every minute & show notification if due
    useEffect(() => {
        const checkReminders = () => {
            const now = new Date().toISOString().split("T")[0]; // Current date (YYYY-MM-DD)

            reminders.forEach((reminder) => {
                if (reminder.date === now) {
                    showNotification(reminder.name);
                    handleRemove(reminder.id); // Remove reminder after notification
                }
            });
        };

        const interval = setInterval(checkReminders, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [reminders]);

    // Push notification logic
    const showNotification = (message: string) => {
        if (Notification.permission === "granted") {
            new Notification("Reminder Alert!", {
                body: message,
                icon: "/assets/reminder-icon.png",
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    showNotification(message);
                }
            });
        }
    };

    return (
        <div className="reminders-tab">
            <h4>📅 Your Reminders</h4>
            {reminders.length === 0 ? (
                <p>No reminders set.</p>
            ) : (
                reminders.map((reminder) => (
                    <Card key={reminder.id} className="reminder-card">
                        <Card.Body>
                            <div className="reminder-content">
                                <span className="reminder-name">{reminder.name}</span>
                                <span className="reminder-date">{reminder.date}</span>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleRemove(reminder.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default RemindersTab;
