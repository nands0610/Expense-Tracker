import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./Plans.css";

interface Plan {
    id: number;
    title: string;
    description: string;
    recommendation: string;
    date: string;
}

const initialPlans: Plan[] = [
        {
            id: 6,
            title: "Limit Impulse Purchases",
            description: "Your shopping expenses have increased significantly this month.",
            recommendation: "Wait 24 hours before making non-essential purchases.",
            date: "2025-03-22"
        },
        {
            id: 7,
            title: "Carpool or Use Public Transport",
            description: "Transport costs are higher than usual due to frequent ride-hailing services.",
            recommendation: "Try using public transport or carpooling to reduce expenses.",
            date: "2025-03-25"
        },
        {
            id: 8,
            title: "Switch to Budget Groceries",
            description: "Grocery spending is exceeding your usual monthly budget.",
            recommendation: "Opt for local markets, discount stores, or bulk buying.",
            date: "2025-03-28"
        },
        {
            id: 9,
            title: "Cut Down on Coffee Runs",
            description: "Frequent café visits are adding up to a substantial amount.",
            recommendation: "Make coffee at home to save money each month.",
            date: "2025-03-30"
        },
        {
            id: 10,
            title: "Use Cashback & Discount Offers",
            description: "You could be saving more by using cashback apps and discount coupons.",
            recommendation: "Look for cashback offers on your regular purchases.",
            date: "2025-04-02"
        },
        {
            id: 11,
            title: "Reduce Entertainment Costs",
            description: "Streaming services and entertainment expenses are higher than your usual budget.",
            recommendation: "Consider sharing subscriptions or choosing a more affordable plan.",
            date: "2025-04-05"
        },
        {
            id: 12,
            title: "Plan Meals to Avoid Food Waste",
            description: "Grocery expenses are high, and food wastage is a possibility.",
            recommendation: "Plan weekly meals and create a shopping list to avoid overbuying.",
            date: "2025-04-08"
        },
        {
            id: 13,
            title: "Refinance Loans for Lower Interest Rates",
            description: "Your loan payments are a significant portion of your expenses.",
            recommendation: "Consider refinancing or negotiating for lower interest rates.",
            date: "2025-04-12"
        },
        {
            id: 14,
            title: "Set a Fun Budget",
            description: "Entertainment expenses are fluctuating unpredictably.",
            recommendation: "Allocate a fixed amount each month for fun activities to maintain balance.",
            date: "2025-04-15"
        },
        {
            id: 15,
            title: "Explore Side Income Opportunities",
            description: "Your current expenses exceed your income.",
            recommendation: "Look for freelance work, part-time jobs, or passive income opportunities.",
            date: "2025-04-18"
        }
    ];
    

const Plans: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>(initialPlans);

    return (
        <Container className="plans-container">
            <h2 className="plans-title">📋 Financial Plans</h2>
            <Row className="plan-grid">
                {plans.map((plan) => (
                    <Col key={plan.id} md={4} className="mb-4">
                        <Card className="plan-card">
                            <Card.Body>
                                <Card.Title>{plan.title}</Card.Title>
                                <Card.Text>{plan.description}</Card.Text>
                                <Card.Text className="recommendation">{plan.recommendation}</Card.Text>
                                <small className="text-muted">Suggested on: {plan.date}</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Button variant="primary" className="add-plan-btn">
                + Add New Plan
            </Button>
        </Container>
    );
};

export default Plans;
