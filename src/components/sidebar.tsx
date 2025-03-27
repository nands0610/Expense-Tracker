import { FaHome, FaFileInvoiceDollar, FaSuitcase, FaCheckCircle, FaCog, FaHeadset, FaMoneyBillWave } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Sidebar.css";

interface SidebarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({  }) => {
  const navigate = useNavigate();
  return (
    
    <div className="sidebar">
      {/* Website Name */}
      <h2 className="website-name">BudgetBytes</h2>
      {/* Profile Section */}
      <div className="profile-section">
        <img src="/profile.jpg" alt="User Profile" className="profile-pic" />
        <h5 className="username">Nanditha S</h5>
      </div>

      {/* Sidebar Menu */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/dashboard" className="nav-link"><FaHome /> Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="/expenses" className="nav-link"><FaFileInvoiceDollar /> Expenses</a>
        </li>

        <li className="nav-item">
          <a href="/incomes" className="nav-link"><FaMoneyBillWave /> Incomes</a> 
        </li>
        <li className="nav-item">
          <a href="/goals" className="nav-link"><FaCheckCircle /> Goals</a> 
        </li>
        <li className="nav-item">
          <a href="/settings" className="nav-link"><FaCog /> Settings</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link"><FaHeadset /> Support</a>
        </li>
      </ul>

      {/* Dark Mode Toggle */}
      <Button className="btn-toggle" onClick={() => navigate('/')}>
        Log Out
      </Button>
    </div>
  );
};

export default Sidebar;
