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
    { id: 5, date: "2024-03-20", category: "Groceries", amount: 1500 },
    { id: 6, date: "2024-03-25", category: "Bills", amount: 2500 },
    { id: 7, date: "2024-04-02", category: "Food", amount: 700 },
    { id: 8, date: "2024-04-07", category: "Transport", amount: 300 },
    { id: 9, date: "2024-04-12", category: "Healthcare", amount: 1200 },
    { id: 10, date: "2024-04-17", category: "Entertainment", amount: 600 },
    { id: 11, date: "2024-04-22", category: "Education", amount: 2000 },
    { id: 12, date: "2024-04-27", category: "Shopping", amount: 1800 },
    { id: 13, date: "2024-05-03", category: "Food", amount: 900 },
    { id: 14, date: "2024-05-08", category: "Transport", amount: 250 },
    { id: 15, date: "2024-05-14", category: "Travel", amount: 5000 },
    { id: 16, date: "2024-05-20", category: "Bills", amount: 2300 },
    { id: 17, date: "2024-05-28", category: "Healthcare", amount: 1500 },
    { id: 18, date: "2024-06-05", category: "Entertainment", amount: 1100 },
    { id: 19, date: "2024-06-10", category: "Shopping", amount: 1300 },
    { id: 20, date: "2024-06-15", category: "Education", amount: 2500 }
];

const Expenses: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
    const [filterCategory, setFilterCategory] = useState("");
    const [filterMinAmount, setFilterMinAmount] = useState("");
    const [filterMaxAmount, setFilterMaxAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Remove expense function
    const handleDeleteExpense = (id: number) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
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

            {/* Grid Layout for Cards */}
            <div className="card-grid">
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
            </div>

            {/* Expense List */}
            <Card className="expenses-list-card expenses-card">
                <Card.Body>
                    <h5 className="list-title">Expense List</h5>
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
                                    <td colSpan={4} className="text-center">No expenses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Expenses;
