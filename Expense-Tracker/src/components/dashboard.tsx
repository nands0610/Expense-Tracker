import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Spinner, Form, InputGroup } from "react-bootstrap";
import { FaChartLine, FaWallet } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import NewExpenseModal from "./NewExpenseModal";
import NewIncomeModal from "./NewIncomeModal";
import NewGoalModal from "./NewGoalModal";
import ReminderModal from "./ReminderModal";
import Mascot from "./Mascot";
import TrendGraph from "./TrendGraph";
import {
  getMonthlyIncome,
  getMonthlyExpenses,
  getExpenseBreakdown,
  getExpensesLast6Months,
  getUserSavingsPercentage,
  updateSavingsPercentage
} from "../api";
import IncomeMascot from "./IncomeMascot";

const Dashboard = () => {
  const location = useLocation();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [showIncomeMascot, setShowIncomeMascot] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [expenseBreakdown, setExpenseBreakdown] = useState<{ category: string; value: number }[]>([]);
  const [expensesLast6Months, setExpensesLast6Months] = useState<{ month: string; Expenses: number }[]>([]);
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const incomeData = await getMonthlyIncome();
      const expensesData = await getMonthlyExpenses();
      const breakdownData = await getExpenseBreakdown();
      const last6MonthsData = await getExpensesLast6Months();
      const savingsData = await getUserSavingsPercentage();

      setMonthlyIncome(incomeData.total_income);
      setMonthlyExpenses(expensesData.total_expenses);
      setExpenseBreakdown(breakdownData);
      setSavingsPercentage(savingsData.savings_percentage);

      const formattedLast6Months = last6MonthsData.map((item: any) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return {
          month: monthNames[item.month - 1],
          Expenses: item.Expenses
        };
      });
      setExpensesLast6Months(formattedLast6Months);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (location.state?.showMascot) {
      setShowMascot(true);
    }
  }, [location.state]);

  const handleModalClose = (refresh: boolean = false) => {
    if (refresh) {
      fetchDashboardData();
    }
    setShowExpenseModal(false);
    setShowIncomeModal(false);
    setShowGoalModal(false);
    setShowReminderModal(false);
  };

  const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSavingsPercentage(isNaN(value) ? 0 : value);
  };

  const handleUpdateSavings = async () => {
    try {
      const response = await updateSavingsPercentage(savingsPercentage);
      // Optionally, you could show a success message here
      console.log(response.message);
    } catch (error) {
      console.error("Error updating savings percentage:", error);
    }
  };

  // Function to trigger IncomeMascot when new income is added
  const triggerIncomeMascot = () => {
    setShowIncomeMascot(true);
    setTimeout(() => setShowIncomeMascot(false), 5000); // Show for 5 seconds
  };

  return (
    <div className="dashboard-container">
      {showMascot && <Mascot show={showMascot} />}
      {showIncomeMascot && <IncomeMascot />}  {/* Render IncomeMascot if triggered */}
      <div className="dashboard-content">
        <Container fluid className="p-4">
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}

          <h1 className="mb-4" style={{ color: "var(--accent-color)" }}>
            Dashboard
          </h1>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <Card className="card-custom shadow-lg">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>Monthly Expenses</Card.Title>
                        <p>₹{monthlyExpenses.toFixed(2)}</p>
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
                        <p>₹{monthlyIncome.toFixed(2)}</p>
                      </div>
                      <FaWallet size={30} color="#007bff" className="card-icon" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Savings Target Section */}
              <Row className="mt-3">
                <Col md={12}>
                  <Card className="card-custom shadow-lg">
                    <Card.Body>
                      <Card.Title>Savings Target</Card.Title>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          value={savingsPercentage}
                          onChange={handleSavingsChange}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                        <Button variant="primary" onClick={handleUpdateSavings}>
                          Update
                        </Button>
                      </InputGroup>
                      <small className="text-muted">
                        Enter the percentage of your income you want to save.
                      </small>
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
                        <Button className="btn-custom flex-fill" onClick={() => setShowExpenseModal(true)}>
                          + New Expense
                        </Button>
                        <Button className="btn-custom flex-fill" onClick={() => setShowIncomeModal(true)}>
                          + New Income
                        </Button>
                        <Button className="btn-custom flex-fill" onClick={() => setShowGoalModal(true)}>
                          + New Goal
                        </Button>
                        <Button className="btn-custom flex-fill" onClick={() => setShowReminderModal(true)}>
                          + New Reminder
                        </Button>
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
                      <h5 className="text-left mb-3">Expenses (Last 6 Months)</h5>
                      <BarChartComponent data={expensesLast6Months} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="chart-card shadow-lg">
                    <Card.Body>
                      <h5 className="text-left mb-3">Expense Breakdown (This Month)</h5>
                      <PieChartComponent data={expenseBreakdown} />
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
            </>
          )}

          {/* Modals */}
          <NewExpenseModal show={showExpenseModal} handleClose={(refresh: boolean) => handleModalClose(refresh)} />
          <NewIncomeModal
            show={showIncomeModal}
            handleClose={(refresh: boolean) => handleModalClose(refresh)}
            triggerConfetti={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }}
            triggerIncomeMascot={triggerIncomeMascot}  // Pass down the trigger function
          />
          <NewGoalModal show={showGoalModal} handleClose={(refresh: boolean) => handleModalClose(refresh)} />
          <ReminderModal
            show={showReminderModal}
            onClose={(refresh: boolean) => handleModalClose(refresh)}
            onAddReminder={(name: string, date: string, time: string) => {
              // Optionally implement if needed.
            }}
          />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
