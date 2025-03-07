import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import './styles.css'; // Import the custom CSS

function App() {
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage on first render
  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Called by ExpenseForm to add a new expense
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // Calculate each person's balance
  function calculateBalances(expensesList) {
    const totals = {};
    expensesList.forEach((exp) => {
      if (!totals[exp.payer]) {
        totals[exp.payer] = 0;
      }
      totals[exp.payer] += exp.amount;
    });

    const payers = Object.keys(totals);
    const numPayers = payers.length;
    const grandTotal = payers.reduce((sum, payer) => sum + totals[payer], 0);
    const share = numPayers > 0 ? grandTotal / numPayers : 0;

    const balances = {};
    payers.forEach((payer) => {
      balances[payer] = totals[payer] - share;
    });

    return balances;
  }

  const balances = calculateBalances(expenses);

  // Clear all expenses (and from localStorage)
  const clearAll = () => {
    setExpenses([]);
    localStorage.removeItem('expenses');
  };

  return (
    <>
      {/* HERO SECTION */}
      <header className="hero">
        <h1>Expense Splitter</h1>
        <p>
          Keep track of shared expenses effortlessly! Enter expenses below 
          and see who owes whom.
        </p>
        {/* Wave at the bottom of the hero */}
        <div className="wave">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
          </svg>
        </div>
      </header>

      {/* MAIN CONTAINER (CARD) */}
      <main className="app-container">
        <ExpenseForm onAddExpense={addExpense} />

        <h2 className="section-title">Expenses</h2>
        <ul className="expense-list">
          {expenses.map((exp, index) => (
            <li key={index}>
              <strong>{exp.payer}</strong> paid <strong>{exp.amount}</strong> for {exp.description}
            </li>
          ))}
        </ul>

        <button className="clear-btn neon-btn" onClick={clearAll}>
          Clear All
        </button>

        <h2 className="section-title">Balances</h2>
        <ul className="balances-list">
          {Object.entries(balances).map(([person, balance]) => {
            const amount = Math.abs(balance);
            return balance < 0 ? (
              <li key={person}>
                <strong>{person}</strong> owes {amount}
              </li>
            ) : (
              <li key={person}>
                <strong>{person}</strong> is owed {amount}
              </li>
            );
          })}
        </ul>
      </main>

      {/* FOOTER WITH NAME & REG */}
      <footer className="footer">
        <p>Name: <strong>Elankavi R</strong></p>
        <p>Reg: <strong>727823TUEC049</strong></p>
      </footer>
    </>
  );
}

export default App;