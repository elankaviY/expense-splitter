import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payer && amount && description) {
      onAddExpense({
        payer,
        amount: parseFloat(amount),
        description
      });
      setPayer('');
      setAmount('');
      setDescription('');
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Payer Name"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="neon-btn">Add</button>
    </form>
  );
}

export default ExpenseForm;