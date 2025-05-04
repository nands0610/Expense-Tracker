import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-container">
            {/* Navbar Placeholder */}
            <nav className="navbar">
                <div className="logo">BudgetBytes</div>
                <ul className="nav-links">
                    <li><a href='/signup'>Sign up</a></li>
                    <li><a href='/login'>Log in</a></li>

                </ul>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <Container>
                    <Row className="align-items-center">
                        <Col md={5} className="hero-text">  {/* Reduce text width */}
                            <h1 className="hero-title">Take Control of Your Finances</h1>
                            <p className="hero-subtitle">
                                With BudgetBytes, managing your money has never been easier. Our smart expense tracking and budgeting tools help you understand your spending habits, set achievable financial goals, and plan for the future—all in one place.
                            </p>
                            <Button variant="primary" className="hero-btn" onClick={() => navigate('/signup')}>Get Started</Button>
                            <p className="trusted-text">Trusted by 10+ users</p>

                        </Col>
                        <Col md={7} className="hero-image-wrapper">  {/* Increase image width */}
                            <img src="/hero-image.png" alt="Finance Management" className="hero-image" />
                        </Col>
                    </Row>

                </Container>
            </section>

            {/* Features Section */}
            <section className="features">
                <Container>
                    <h2 className="section-title">Smart Features to Simplify Your Budgeting</h2>
                    <Row>
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body>
                                    <h5>📊 <b>Track Your Goals & Expenses</b></h5>
                                    <p>Monitor every rupee you spend and stay on top of your financial goals. BudgetBytes makes it effortless to categorize expenses and see where your money is going.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body>
                                    <h5>🔮 <b>Predict Future Expenses</b></h5>
                                    <p>Worried about unexpected costs? Our AI analyzes your spending patterns to forecast future expenses, so you can plan ahead and avoid surprises.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body>
                                    <h5>🎯 <b>Personalized Budgeting Tips</b></h5>
                                    <p>Get data-driven recommendations tailored to your spending habits. From cutting down on unnecessary subscriptions, BudgetBytes helps you make better financial decisions.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <Container>
                    <h2 className="section-title">What Our Users Say</h2>
                    <Row>
                        <Col md={6}>
                            <Card className="testimonial-card">
                                <Card.Body>
                                    <p>"I used to wonder where all my money went at the end of the month. BudgetBytes helped me track my expenses and suggested better ways to save. Now, I feel more in control of my finances!"</p>
                                    <strong>- Rahul Akshath, Student</strong>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="testimonial-card">
                                <Card.Body>
                                    <p>"Saving for my dream vacation felt impossible until I started using BudgetBytes. The goal tracker kept me motivated, and the spending insights showed me where I could cut back. I reached my goal two months early!"</p>
                                    <strong>- Nanditha S, Intern</strong>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>Powered by Insights, Driven by Smart Spending</p>
            </footer>
        </div>
    );
};

export default LandingPage;
