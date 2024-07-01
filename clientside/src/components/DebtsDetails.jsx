import React, { useState, useEffect } from 'react';

const DebtsDetails = ({ familyIndex }) => {
  const [debtData, setDebtData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/debts?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((data) => setDebtData(data));
  }, [familyIndex]);

  return (
    <div>
      <h2>חובות</h2>
      <table>
        <thead>
          <tr>
            <th>משכנתא - חוב</th>
            <th>משכנתא - תשלומים חודשיים</th>
            <th>גמ"ח - חוב</th>
            <th>גמ"ח - תשלומים חודשיים</th>
            <th>הלוואות בנקאיות - חוב</th>
            <th>הלוואות בנקאיות - תשלומים חודשיים</th>
            <th>הלוואות פרטיות - חוב</th>
            <th>הלוואות פרטיות - תשלומים חודשיים</th>
          </tr>
        </thead>
        <tbody>
          {debtData.length > 0 ? (
            <tr>
              <td>{debtData.mortgageDebt}</td>
              <td>{debtData.mortgageRepayments}</td>
              <td>{debtData.gmachDebt}</td>
              <td>{debtData.gmachRepayments}</td>
              <td>{debtData.bankLoansDebt}</td>
              <td>{debtData.bankLoansRepayments}</td>
              <td>{debtData.outstandingLoansDebt}</td>
              <td>{debtData.outstandingLoansRepayments}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="8">אין נתוני חובות זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DebtsDetails;
