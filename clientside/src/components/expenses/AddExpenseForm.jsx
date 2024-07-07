import React, { useState } from 'react';

const AddExpenseForm = ({ familyIndex, onClose, setParentExpenseData }) => {
  const [expenseData, setExpenseData] = useState({
    familyIndex: familyIndex,
    expenseDescription: '',
    expenseSum: '',
  });
  const YEAR =  2024;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/expenses/${YEAR}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Expense added:', data);
        setParentExpenseData(prev => [...prev, expenseData]);
        onClose();        
      })
      .catch(error => {
        console.error('Error adding expense:', error);       
      });
  };

  return (
    <div>
      <h2>הוספת הוצאה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <label>:תיאור הוצאה</label>
        <input type="text" name="expenseDescription" value={expenseData.expenseDescription} onChange={handleInputChange} required />
        <label>:סכום הוצאה</label>
        <input type="number" name="expenseSum" value={expenseData.expenseSum} onChange={handleInputChange} required />
        <button type="submit">הוסף הוצאה</button>
        <button onClick={() => onClose()}>ביטול</button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
