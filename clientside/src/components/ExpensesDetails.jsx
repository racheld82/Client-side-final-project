import React, { useState, useEffect } from 'react';

const ExpensesDetails = ({ familyIndex }) => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/expenses?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((data) => setExpenseData(data));
  }, [familyIndex]);

  return (
    <div className="table-container">
      <h2>הוצאות</h2>
      <table>
        <thead>
          <tr>
            <th>תיאור הוצאה</th>
            <th>סכום הוצאה</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.length > 0 ? (
            expenseData.map((expense) => (
              <tr key={expense.expenseDescription}>
                <td>{expense.expenseDescription}</td>
                <td>{expense.expenseSum}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">אין נתוני הוצאות זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesDetails;
