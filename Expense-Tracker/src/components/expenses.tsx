import React, { useState, useEffect } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
import { getExpenses, deleteExpense } from "../api";
import "./Expenses.css";

interface Expense {
    id: string;
    date: string;
    category: string;
    amount: number;
}

const Expenses: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [filterCategory, setFilterCategory] = useState("");
    const [filterMinAmount, setFilterMinAmount] = useState("");
    const [filterMaxAmount, setFilterMaxAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Remove expense function using the backend delete endpoint
    const handleDeleteExpense = async (id: string) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    // Filtering logic
    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
            (filterCategory === "" || expense.category === filterCategory) &&
            (filterMinAmount === "" || expense.amount >= Number(filterMinAmount)) &&
            (filterMaxAmount === "" || expense.amount <= Number(filterMaxAmount)) &&
            (!start || expenseDate >= start) &&
            (!end || expenseDate <= end)
        );
    });

    return (
        <div className="expenses-container">
            <h2 className="expenses-title">💰 My Expenses</h2>

            {/* Filter Section */}
            <Card className="filter-card expenses-card">
                <Card.Body>
                    <h5 className="filter-title">Filter Expenses</h5>
                    <Form className="filter-form">
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                className="filter-input"
                                onChange={(e) => setFilterCategory(e.target.value)}
                                value={filterCategory}
                            >
                                <option value="">All Categories</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Travel">Travel</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Min Amount (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                className="filter-input"
                                placeholder="Min ₹"
                                value={filterMinAmount}
                                onChange={(e) => setFilterMinAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Amount (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                className="filter-input"
                                placeholder="Max ₹"
                                value={filterMaxAmount}
                                onChange={(e) => setFilterMaxAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                className="filter-input"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                className="filter-input"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            {/* Expense List */}
            <Card className="expenses-list-card expenses-card">
                <Card.Body>
                    <h5 className="list-title">Expense List</h5>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <Table striped bordered hover responsive className="expenses-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Amount (₹)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.length > 0 ? (
                                    filteredExpenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{expense.date}</td>
                                            <td>{expense.category}</td>
                                            <td>₹{expense.amount.toLocaleString()}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteExpense(expense.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            No expenses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Expenses;
