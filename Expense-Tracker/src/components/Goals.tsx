import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./Goals.css"; // Ensure this file exists

const Goals = () => {
    const [ongoingGoals, setOngoingGoals] = useState([
        { id: 1, title: "Save ₹50,000", progress: "₹30,000 saved", percent: 60 },
        { id: 2, title: "Vacation Fund", progress: "₹15,000 saved", percent: 30 },
    ]);

    const [completedGoals] = useState([
        { id: 3, title: "Buy a Laptop", date: "Jan 2025", status: "Completed" },
        { id: 4, title: "Emergency Fund", date: "Dec 2024", status: "Completed" },
    ]);

    const [unachievedGoals, setUnachievedGoals] = useState([
        { id: 5, title: "Invest ₹1,00,000", date: "Missed - Mar 2024", status: "Unachieved" },
        { id: 6, title: "New Car Fund", date: "Missed - Dec 2023", status: "Unachieved" },
    ]);

    // Function to remove goal from ongoing goals
    const removeOngoingGoal = (id: number) => {
        setOngoingGoals(ongoingGoals.filter(goal => goal.id !== id));
    };

    // Function to retry an unachieved goal (moves it to ongoing)
    const retryUnachievedGoal = (id: number) => {
        const goalToRetry = unachievedGoals.find(goal => goal.id === id);
        if (goalToRetry) {
            const newOngoingGoal = {
                id: goalToRetry.id,
                title: goalToRetry.title,
                progress: "Starting again!",
                percent: 0
            };
            setOngoingGoals([...ongoingGoals, newOngoingGoal]);
            setUnachievedGoals(unachievedGoals.filter(goal => goal.id !== id));
        }
    };

    return (
        <div className="goals-container">
            <h2 className="section-title">Goals</h2>

            {/* Ongoing Goals Section */}
            <h4 className="sub-title">🎯 Ongoing Goals</h4>
            {ongoingGoals.length === 0 ? (
                <p className="empty-label">No ongoing goals</p>
            ) : (
                <div className="goals-grid">
                    {ongoingGoals.map((goal) => (
                        <Card key={goal.id} className="goal-card ongoing">
                            <Card.Body>
                                <Card.Title>{goal.title}</Card.Title>
                                <Card.Text>{goal.progress}</Card.Text>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${goal.percent}%` }}></div>
                                </div>
                                <button className="remove-goal-btn" onClick={() => removeOngoingGoal(goal.id)}>
                                    Remove Goal
                                </button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}

            {/* Completed Goals Section */}
            <h4 className="sub-title">🏆 Completed Goals</h4>
            <div className="goals-grid">
                {completedGoals.map((goal) => (
                    <Card key={goal.id} className="goal-card completed">
                        <Card.Body>
                            <Card.Title>{goal.title}</Card.Title>
                            <Card.Text>Achieved: {goal.date}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Unachieved Goals Section */}
            <h4 className="sub-title missed">❌ Unachieved Goals</h4>
            {unachievedGoals.length === 0 ? (
                <p className="empty-label">No unachieved goals</p>
            ) : (
                <div className="goals-grid">
                    {unachievedGoals.map((goal) => (
                        <Card key={goal.id} className="goal-card unachieved">
                            <Card.Body>
                                <Card.Title>{goal.title}</Card.Title>
                                <Card.Text>{goal.date}</Card.Text>
                                <button className="retry-goal-btn" onClick={() => retryUnachievedGoal(goal.id)}>
                                    Retry Goal
                                </button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}

            <Button className="add-goal-btn">+ Add New Goal</Button>
        </div>
    );
};

export default Goals;
