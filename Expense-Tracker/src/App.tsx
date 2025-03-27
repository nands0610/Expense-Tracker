import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Expenses from "./components/expenses";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Trips from "./components/Trips";
import Goals from "./components/Goals";
import Settings from "./components/Settings";
import Signup from "./components/Signup";
import Incomes from "./components/Incomes";
import Chatbot from "./components/Chatbot";
import Plans from "./components/Plans";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* Wrap all routes needing sidebar inside MainLayout */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/expenses"
          element={
            <MainLayout>
              <Expenses />
            </MainLayout>
          }
        />
        <Route
          path="/incomes"
          element={
            <MainLayout>
              <Incomes />
            </MainLayout>
          }
        />
        <Route
          path="/goals"
          element={
            <MainLayout>
              <Goals />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />
        <Route
          path="/plans"
          element={
            <MainLayout>
              <Plans />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
