import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import backgroundImage from "../assets/dash.jpeg"; // Import background image
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleAddTransaction = async (type) => {
    const amount = prompt(`Enter ${type} amount:`);
    const category = prompt(`Enter ${type} category:`);

    if (!amount || !category) {
      alert("Amount and category are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/transactions/add", {
        type,
        amount: Number(amount),
        category,
        date: new Date().toISOString(),
      });

      alert(response.data.message);
      fetchTransactions(); // Refresh transactions without reloading the page
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = income - expenses;

  return (
    <div className="dashboard-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard !!</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="balance-section">
        <h3>Total Balance: ₹{totalBalance}</h3>
        <div className="summary">
          <p>💰 <span className="income-text">Income:</span> ₹{income}</p>
          <p>💸 <span className="expense-text">Expenses:</span> ₹{expenses}</p>
        </div>
      </div>

      <div className="transactions-container">
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className={transaction.type}>
              <span className="category">{transaction.category}</span> - ₹{transaction.amount} 
              <span className="date">({new Date(transaction.date).toLocaleDateString()})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button className="add-income-btn" onClick={() => handleAddTransaction("income")}>
          <FaPlusCircle /> Add Income
        </button>
        <button className="add-expense-btn" onClick={() => handleAddTransaction("expense")}>
          <FaPlusCircle /> Add Expense
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
