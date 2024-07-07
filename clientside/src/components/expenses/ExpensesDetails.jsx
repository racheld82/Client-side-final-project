import React, { useState, useEffect, useReducer } from 'react';
import AddExpenseForm from './AddExpenseForm';

const ExpensesDetails = ({ familyIndex }) => {
  const [expenseData, setExpenseData] = useState([]);
  const [lastYearExpenseData, setLastYearExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [lastYearTotalExpense, setLastYearTotalExpense] = useState(null);
  const [deleteAll, setDeleteAll] = useState(false);
  const [addingExpense, setAddingExpense] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const YEAR = 2024;



  useEffect(() => {
    fetch(`http://localhost:8080/expenses?familyIndex=${familyIndex}&year=${YEAR}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => {        
        setExpenseData(result.data);
        ExpensesSum(result.data, setTotalExpense);
      })
    fetch(`http://localhost:8080/expenses?familyIndex=${familyIndex}&year=${YEAR - 1}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => {        
        setLastYearExpenseData(result.data);
        ExpensesSum(result.data, setLastYearTotalExpense)
      })
  }, [familyIndex]);

  const ExpensesSum = (data, set) => {
    let t_expense = 0;
    if(data) data.map((expense) => { t_expense += expense.expenseSum });
    set(t_expense);
  }

  const ExpensesMonitor = () => {
    const expenseDifference = totalExpense - lastYearTotalExpense;
    const expenseChangePercentage = (expenseDifference / lastYearTotalExpense) * 100;

    let message;
    if (expenseDifference > 0) {
      message = `ההוצאות גדלו ב ${expenseChangePercentage.toFixed(2)}%`;
    } else if (expenseDifference < 0) {
      message = `ההוצאות קטנו ב ${Math.abs(expenseChangePercentage.toFixed(2))}%`;
    } else {
      message = `ההוצאות לא השתנו משנה לשנה`;
    }
    return message;
  }

  const handleCloseModal = () => {
    if(deleteAll) setDeleteAll(false);
    if(addingExpense) setAddingExpense(false);
  }

  const handleDeleteAll = () => {   
      fetch(`http://localhost:8080/expenses/${familyIndex}?year=${YEAR}`, { method: 'DELETE' })
        .then((response) => response.json())
        .then(() => {
          setExpenseData([]);
          setLastYearExpenseData([]);
          setTotalExpense(null);
          setLastYearTotalExpense(null);
          handleCloseModal();
          forceUpdate();
        })
        .catch(error => { console.error("error deleteing child: ", error) });  
  }

  return (
    <div className="table-container">
      <h2>הוצאות</h2>
      <button onClick={() => setDeleteAll(true)}>מחיקת כל הוצאות המשפחה בשנה זו</button>
      {deleteAll && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>?האם למחוק את כל הוצאות המשפחה בשנה זו</h5>
            <button onClick={handleDeleteAll}>מחק</button>
            <button onClick={handleCloseModal}>ביטול</button>
          </div>
        </div>
      )}
      <button onClick={() => setAddingExpense(true)}>הוסף הוצאה</button>
      {addingExpense &&
        <div className="modal-overlay">
          <div className="modal-content">
            <AddExpenseForm familyIndex={familyIndex} onClose={handleCloseModal} setParentExpenseData={setExpenseData}/>
          </div>
        </div>
      }
      <table>
        <thead>
          <tr>
            <th>תיאור הוצאה</th>
            <th>סכום הוצאה</th>
          </tr>
        </thead>
        <tbody>
          {expenseData ? (
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
          {lastYearExpenseData ? (
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
