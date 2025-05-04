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
import LandingPage from "./components/LandingPage";
<<<<<<< HEAD
=======
import RemindersTab from "./components/RemindersTab";
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/land" />} />
        <Route path="/land" element={<LandingPage />} />
=======
        <Route path="/" element={<Navigate to="/landing" />} />
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} />


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
        <Route
<<<<<<< HEAD
          path="/landing"
          element={
            <MainLayout>
              <LandingPage />
=======
          path="/reminders"
          element={
            <MainLayout>
              <RemindersTab />
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
