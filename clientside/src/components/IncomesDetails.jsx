import React, { useState, useEffect } from 'react';

const IncomesDetails = ({ familyIndex }) => {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/incomes/${familyIndex}`)
      .then((response) => response.json())
      .then((data) => setIncomeData(data));
  }, [familyIndex]);

  return (
    <div>
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
        </tbody>
      </table>
    </div>
  );
};

export default IncomesDetails;
