import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Expenses from "./components/expenses";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Trips from "./components/Trips";
import Goals from "./components/Goals";
import Settings from "./components/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

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
          path="/trips"
          element={
            <MainLayout>
              <Trips />
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
      </Routes>
    </Router>
  );
};

export default App;
