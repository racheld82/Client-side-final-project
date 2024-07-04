import React, { useState, useEffect } from 'react';

const IncomesDetails = ({ familyIndex }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [lastYearIncomeData, setLastYearIncomeData] = useState([]);
  const YEAR=2024;


  useEffect(() => {
    fetch(`http://localhost:8080/incomes?familyIndex=${familyIndex}&year=${YEAR}`)
      .then((response) => response.json())
      .then((data) => setIncomeData(data));
      fetch(`http://localhost:8080/incomes?familyIndex=${familyIndex}&year=${YEAR-1}`)
      .then((response) => response.json())
      .then((data) => setLastYearIncomeData(data));

  }, [familyIndex]);

  const IncomesMonitor=()=>{
    const incomeDifference = incomeData.totalIncomes - lastYearIncomeData.totalIncomes;
    const incomeChangePercentage = (incomeDifference / lastYearIncomeData.totalIncomes) * 100;

  let message;
  if (incomeDifference > 0) {
      message = `ההכנסות גדלו ב ${incomeChangePercentage.toFixed(2)}%`;
  } else if (incomeDifference < 0) {
    message = `ההכנסות קטנו ב ${Math.abs(incomeChangePercentage.toFixed(2))}%`;
  } else {
    message = `ההכנסות לא השתנו משנה לשנה`;
  }

  return message;
}

  return (
    <div className="table-container">
      <h2>הכנסות</h2>
      <table>
        <thead>
          <tr>
            <th>הכנסות בעל</th>
            <th>הכנסות אישה</th>
            <th>תיאור הכנסות נוספות</th>
            <th>סכום הכנסות נוספות</th>
            <th>קצבאות ילדים</th>
            <th>קצבת הבטחת הכנסה</th>
            <th>גמ״ח</th>
            <th>הכנסה ערוב</th>
            <th>סיוע בשכר דירה</th>
            <th>מזונות</th>
            <th>תמיכה ממשפחה</th>
            <th>תרומות</th>
            <th>הכנסות מנכסים</th>
            <th>סך הכל הכנסות</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.length > 0 ? (
            <tr>
              <td>{incomeData.husbandIncomesSum}</td>
              <td>{incomeData.wifeIncomesSum}</td>
              <td>{incomeData.addtionalIncomesDescription}</td>
              <td>{incomeData.addtionalIncomesSum}</td>
              <td>{incomeData.childAllowance}</td>
              <td>{incomeData.residualAllowance}</td>
              <td>{incomeData.disabilityFund}</td>
              <td>{incomeData.guaranteedIncome}</td>
              <td>{incomeData.rentAssitance}</td>
              <td>{incomeData.alimony}</td>
              <td>{incomeData.familySupport}</td>
              <td>{incomeData.charitySupport}</td>
              <td>{incomeData.propertyIncomes}</td>
              <td>{incomeData.totalIncomes}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="14">אין נתוני הכנסות זמינים</td>
            </tr>
          )}
          {lastYearIncomeData.length > 0 ? (
            <tr>
              <td>{lastYearIncomeData.husbandIncomesSum}</td>
              <td>{lastYearIncomeData.wifeIncomesSum}</td>
              <td>{lastYearIncomeData.addtionalIncomesDescription}</td>
              <td>{lastYearIncomeData.addtionalIncomesSum}</td>
              <td>{lastYearIncomeData.childAllowance}</td>
              <td>{lastYearIncomeData.residualAllowance}</td>
              <td>{lastYearIncomeData.disabilityFund}</td>
              <td>{lastYearIncomeData.guaranteedIncome}</td>
              <td>{lastYearIncomeData.rentAssitance}</td>
              <td>{lastYearIncomeData.alimony}</td>
              <td>{lastYearIncomeData.familySupport}</td>
              <td>{lastYearIncomeData.charitySupport}</td>
              <td>{lastYearIncomeData.propertyIncomes}</td>
              <td>{lastYearIncomeData.totalIncomes}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="14">אין נתוני הכנסות קודמים זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>{IncomesMonitor()}</p>
    </div>
  );
};

export default IncomesDetails;
