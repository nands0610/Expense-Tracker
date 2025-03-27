import React from "react";
import { Table, Card, Container } from "react-bootstrap";
import "./Incomes.css"; // Import styles

// Sample Data (Replace with real data)
const currentMonthIncomes = [
    { id: 1, source: "Freelance Project", amount: 5000, date: "2025-03-10" },
    { id: 2, source: "Part-time Job", amount: 3000, date: "2025-03-15" }
];

const pastIncomes = [
    { id: 3, source: "Internship", amount: 8000, date: "2025-02-05" },
    { id: 4, source: "Freelance Work", amount: 4500, date: "2025-01-20" },
    { id: 5, source: "Tutoring", amount: 2500, date: "2024-12-15" },
    { id: 6, source: "Online Course Sales", amount: 12000, date: "2024-11-30" },
    { id: 7, source: "YouTube Ad Revenue", amount: 5600, date: "2024-10-25" },
    { id: 8, source: "Stock Dividends", amount: 3000, date: "2024-09-10" },
    { id: 9, source: "Consulting", amount: 9000, date: "2024-08-18" },
    { id: 10, source: "Graphic Design Projects", amount: 6500, date: "2024-07-12" },
    { id: 11, source: "Blog Sponsorship", amount: 4800, date: "2024-06-05" },
    { id: 12, source: "Affiliate Marketing", amount: 7200, date: "2024-05-22" }
];

const Incomes: React.FC = () => {
    return (
        <Container className="incomes-container">
            <h2 className="mb-4">📈 Your Incomes</h2>

            {/* Current Month's Incomes */}
            <Card className="income-card mb-4 shadow-lg">
                <Card.Body>
                    <h5>This Month's Incomes</h5>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Source</th>
                                <th>Amount (₹)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMonthIncomes.length > 0 ? (
                                currentMonthIncomes.map((income, index) => (
                                    <tr key={income.id}>
                                        <td>{index + 1}</td>
                                        <td>{income.source}</td>
                                        <td>₹{income.amount.toLocaleString()}</td>
                                        <td>{income.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center">No incomes this month.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Past Incomes */}
            <Card className="income-card shadow-lg">
                <Card.Body>
                    <h5>Past Incomes</h5>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Source</th>
                                <th>Amount (₹)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastIncomes.length > 0 ? (
                                pastIncomes.map((income, index) => (
                                    <tr key={income.id}>
                                        <td>{index + 1}</td>
                                        <td>{income.source}</td>
                                        <td>₹{income.amount.toLocaleString()}</td>
                                        <td>{income.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center">No past incomes found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Incomes;
