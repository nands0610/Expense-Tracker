import { Container, Row, Col, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import NewExpenseModal from "./NewExpenseModal";
import NewIncomeModal from "./NewIncomeModal";
import NewGoalModal from "./NewGoalModal";
import NewPlanModal from "./NewPlanModal";
import Confetti from "react-confetti";

const Dashboard = () => {
    const savingsGoalPercentage = 60;
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <Container fluid className="p-4">
                    {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

                    <h1 className="mb-4" style={{ color: "var(--accent-color)" }}>Dashboard</h1>

                    <Row>
                        <Col md={6}>
                            <Card className="card-custom mb-4">
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Expenses</Card.Title>
                                        <p>₹50,000</p>
                                    </div>
                                    <FaChartLine size={30} color="#007bff" className="card-icon" />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="card-custom mb-4">
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Total Savings</Card.Title>
                                        <p>₹5,000</p>
                                    </div>
                                    <div style={{ width: 40, height: 40 }}>
                                        <CircularProgressbar
                                            value={savingsGoalPercentage}
                                            text={`${savingsGoalPercentage}%`}
                                            styles={buildStyles({
                                                textSize: "30px",
                                                pathColor: "#007bff",
                                                textColor: "#007bff",
                                                trailColor: "#e0e0e0"
                                            })}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Create New Section */}
                    <Row>
                        <Col>
                            <Card className="button-box mt-3">

                                <Card.Body>
                                    <h5 className="mb-3 text-left">Create New</h5>
                                    <div className="d-flex gap-3">
                                        <Button className="btn-custom flex-fill" onClick={() => setShowExpenseModal(true)}>+ New Expense</Button>
                                        <Button className="btn-custom flex-fill" onClick={() => setShowIncomeModal(true)}>+ New Income</Button>
                                        <Button className="btn-custom flex-fill" onClick={() => setShowGoalModal(true)}>+ New Goal</Button>
                                        <Button className="btn-custom flex-fill" onClick={() => setShowPlanModal(true)}>+ New Plan</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Graphs Section */}
                    <Row className="mt-4">
                        <Col md={6}>
                            <Card className="chart-card">
                                <Card.Body>
                                    <h5 className="text-left mb-3">Monthly Expenses</h5>
                                    <BarChartComponent />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="chart-card">
                                <Card.Body>
                                    <h5 className="text-left mb-3">Expense Breakdown</h5>
                                    <PieChartComponent />
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
                    <NewPlanModal show={showPlanModal} handleClose={() => setShowPlanModal(false)} />
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
