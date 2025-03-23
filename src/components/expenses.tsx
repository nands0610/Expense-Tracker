import { useState } from "react";
import { Card, Table, Form, Button } from "react-bootstrap";
import "./Expenses.css";

interface Expense {
    id: number;
    date: string;
    category: string;
    amount: number;
}

const initialExpenses: Expense[] = [
    { id: 1, date: "2024-03-01", category: "Food", amount: 500 },
    { id: 2, date: "2024-03-05", category: "Transport", amount: 200 },
    { id: 3, date: "2024-03-10", category: "Entertainment", amount: 800 },
    { id: 4, date: "2024-03-15", category: "Shopping", amount: 1000 },
];

const Expenses: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
    const [filterCategory, setFilterCategory] = useState("");
    const [filterMinAmount, setFilterMinAmount] = useState("");
    const [filterMaxAmount, setFilterMaxAmount] = useState("");

    const filteredExpenses = expenses.filter((expense) => {
        return (
            (filterCategory === "" || expense.category === filterCategory) &&
            (filterMinAmount === "" || expense.amount >= Number(filterMinAmount)) &&
            (filterMaxAmount === "" || expense.amount <= Number(filterMaxAmount))
        );
    });

    return (
        <div className="expenses-container">
            <h2 className="expenses-title">💰 My Expenses</h2>

            {/* Grid Layout for Cards */}
            <div className="card-grid">
                {/* Filter Section */}
                <Card className="filter-card expenses-card">
                    <Card.Body>
                        <h5 className="filter-title">Filter Expenses</h5>
                        <Form className="filter-form">
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
                            </Form.Select>

                            <Form.Control
                                type="number"
                                className="filter-input"
                                placeholder="Min ₹"
                                value={filterMinAmount}
                                onChange={(e) => setFilterMinAmount(e.target.value)}
                            />
                            <Form.Control
                                type="number"
                                className="filter-input"
                                placeholder="Max ₹"
                                value={filterMaxAmount}
                                onChange={(e) => setFilterMaxAmount(e.target.value)}
                            />
                            <Button variant="primary" className="apply-button">Apply</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            {/* Expense List */}
            <Card className="expenses-list-card expenses-card">
                <Card.Body>
                    <h5 className="list-title">📋 Expense List</h5>
                    <Table striped bordered hover responsive className="expenses-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.date}</td>
                                    <td className={`category ${expense.category.toLowerCase()}`}>
                                        {expense.category}
                                    </td>
                                    <td>₹{expense.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Expenses;
