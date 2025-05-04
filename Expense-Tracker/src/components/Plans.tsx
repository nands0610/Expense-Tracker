import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { getAIBudgetTips, getAIFutureExpensePrediction } from "../api";
import "./Plans.css";

const Plans: React.FC = () => {
  const [budgetTips, setBudgetTips] = useState<string[]>([]);
  const [expensePrediction, setExpensePrediction] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIData = async () => {
      try {
        const tipsResponse = await getAIBudgetTips();
        setBudgetTips(tipsResponse.tips || []);

        const predictionResponse = await getAIFutureExpensePrediction();
        setExpensePrediction(predictionResponse.prediction || "");
      } catch (error) {
        console.error("Error fetching AI data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIData();
  }, []);

  if (loading) {
    return (
      <Container className="plans-container text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="plans-container">
      <h2 className="plans-title">🤖 AI Financial Insights</h2>
      <Row className="mb-4">
        <Col>
          <Card className="plan-card">
            <Card.Body>
              <Card.Title>Smart Budgeting Tips</Card.Title>
              {budgetTips.length > 0 ? (
                budgetTips.map((tip, index) => (
                  <Card.Text key={index}>{tip}</Card.Text>
                ))
              ) : (
                <Card.Text>No budgeting tips available.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card className="plan-card">
            <Card.Body>
              <Card.Title>Next Month Expense Prediction</Card.Title>
              {expensePrediction ? (
                <Card.Text>{expensePrediction}</Card.Text>
              ) : (
                <Card.Text>No prediction available.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Plans;
