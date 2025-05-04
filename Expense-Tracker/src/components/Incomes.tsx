import React, { useState, useEffect } from "react";
import { Table, Card, Container, Button } from "react-bootstrap";
import { getIncomes, deleteIncome } from "../api"; // Adjust path if necessary
import "./Incomes.css";

const Incomes: React.FC = () => {
    const [currentMonthIncomes, setCurrentMonthIncomes] = useState<any[]>([]);
    const [pastIncomes, setPastIncomes] = useState<any[]>([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const incomes = await getIncomes();
                // Separate incomes based on current month
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const current = incomes.filter((income: any) => {
                    const incomeDate = new Date(income.date);
                    return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
                });
                const past = incomes.filter((income: any) => {
                    const incomeDate = new Date(income.date);
                    return !(incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear);
                });

                setCurrentMonthIncomes(current);
                setPastIncomes(past);
            } catch (error) {
                console.error("Error fetching incomes:", error);
            }
        };

        fetchIncomes();
    }, []);

    const handleDeleteIncome = async (id: string, isCurrent: boolean) => {
        try {
            await deleteIncome(id);
            if (isCurrent) {
                setCurrentMonthIncomes(currentMonthIncomes.filter(income => income.id !== id));
            } else {
                setPastIncomes(pastIncomes.filter(income => income.id !== id));
            }
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };

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
                                <th></th>
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
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteIncome(income.id, true)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">No incomes this month.</td>
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
                                <th></th>
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
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteIncome(income.id, false)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">No past incomes found.</td>
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
