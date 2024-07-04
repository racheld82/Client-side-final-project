import React, { useState, useEffect } from 'react';

const ExpensesDetails = ({ familyIndex }) => {
  const [expenseData, setExpenseData] = useState([]);
  const [lastYearExpenseData, setLastYearExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState([]);
  const [lastYearTotalExpense, setLastYearTotalExpense] = useState([]);
  const YEAR=2024;



  useEffect(() => {
    fetch(`http://localhost:8080/expenses?familyIndex=${familyIndex}?year=${YEAR}`)
      .then((response) => response.json())
      .then((data) => setExpenseData(data))
      .then((data)=> ExpensesSum(data, setExpenseData));
      fetch(`http://localhost:8080/expenses?familyIndex=${familyIndex}?year=${YEAR-1}`)
      .then((response) => response.json())
      .then((data) => setLastYearExpenseData(data))
      .then((data)=> ExpensesSum(data, setLastYearExpenseData));
  }, [familyIndex]);

  const ExpensesSum=(data,set)=>{
    let t_expense=0;
    data.map((expense)=>{t_expense+=expense});
    set(t_expense);
  }

  const ExpensesMonitor=()=>{
    const expenseDifference = totalExpense - lastYearTotalExpense;
    const expenseChangePercentage = (expenseDifference / lastYearTotalExpense) * 100;

  let message;
  if (expenseDifference > 0) {
      message = `ההכנסות גדלו ב ${expenseChangePercentage.toFixed(2)}%`;
  } else if (expenseDifference < 0) {
    message = `ההכנסות קטנו ב ${Math.abs(expenseChangePercentage.toFixed(2))}%`;
  } else {
    message = `ההכנסות לא השתנו משנה לשנה`;
  }

  return message;
}

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
          <tr>שנה קודמת</tr>
          {lastYearExpenseData.length > 0 ? (
            lastYearExpenseData.map((expense) => (
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
      <p>{ExpensesMonitor()}</p>
    </div>
  );
};

export default ExpensesDetails;
