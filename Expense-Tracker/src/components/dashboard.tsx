import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaChartLine, FaWallet } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import NewExpenseModal from "./NewExpenseModal";
import NewIncomeModal from "./NewIncomeModal";
import NewGoalModal from "./NewGoalModal";
import Confetti from "react-confetti";
import TrendGraph from "./TrendGraph";
import ReminderModal from "./ReminderModal";
import Mascot from "./Mascot"; // Import Mascot component

const Dashboard = () => {
    const location = useLocation();
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showMascot, setShowMascot] = useState(false); // Mascot visibility state

    function handleAddReminder(name: string, date: string, time: string): void {
        throw new Error("Function not implemented.");
    }

    // Trigger mascot animation if navigated from Signup
    useEffect(() => {
        if (location.state?.showMascot) {
            setShowMascot(true);
        }
    }, [location.state]);


    return (
        <div className="dashboard-container">
            {showMascot && <Mascot show={showMascot} />}
            <div className="dashboard-content">
                <Container fluid className="p-4">
                    {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

                    <h1 className="mb-4" style={{ color: "var(--accent-color)" }}>Dashboard</h1>

                    <Row>
                        <Col md={6}>
                            <Card className="card-custom shadow-lg">
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Monthly Expenses</Card.Title>
                                        <p>₹2,000</p>
                                    </div>
                                    <FaChartLine size={30} color="#007bff" className="card-icon" />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="card-custom shadow-lg">
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Monthly Income</Card.Title>
                                        <p>₹8,000</p>
                                    </div>
                                    <FaWallet size={30} color="#007bff" className="card-icon" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Create New Section */}
                    <Row>
                        <Col>
                            <Card className="button-box shadow-lg mt-3">
                                <Card.Body>
                                    <h5 className="mb-3 text-left">Create New</h5>
                                    <div className="d-flex gap-3">
                                        <Button className="btn-custom flex-fill" onClick={() => setShowExpenseModal(true)}>+ New Expense</Button>
                                        <Button className="btn-custom flex-fill" onClick={() => setShowIncomeModal(true)}>+ New Income</Button>
                                        <Button className="btn-custom flex-fill" onClick={() => setShowGoalModal(true)}>+ New Goal</Button>
                                        <Button className="btn-custom flex-fill" onClick={() => setShowReminderModal(true)}>+ New Reminder</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Graphs Section */}
                    <Row className="mt-4">
                        <Col md={6}>
                            <Card className="chart-card shadow-lg">
                                <Card.Body>
                                    <h5 className="text-left mb-3">Monthly Expenses</h5>
                                    <BarChartComponent />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="chart-card shadow-lg">
                                <Card.Body>
                                    <h5 className="text-left mb-3">Expense Breakdown</h5>
                                    <PieChartComponent />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={12}>
                            <Card className="chart-card shadow-lg">
                                <Card.Body>
                                    <h5 className="text-left mb-3">Expense Trends & Predictions</h5>
                                    <TrendGraph />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <NewExpenseModal show={showExpenseModal} handleClose={() => setShowExpenseModal(false)} />
                    <NewIncomeModal
                        show={showIncomeModal}
                        handleClose={() => setShowIncomeModal(false)}
                        triggerConfetti={() => {
                            setShowConfetti(true);
                            setTimeout(() => setShowConfetti(false), 5000); // Stops confetti after 5s
                        }}
                    />
                    <NewGoalModal show={showGoalModal} handleClose={() => setShowGoalModal(false)} />
                    <ReminderModal
                        show={showReminderModal}
                        onClose={() => setShowReminderModal(false)}  // ✅ Corrected prop name
                        onAddReminder={handleAddReminder}
                    />
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
