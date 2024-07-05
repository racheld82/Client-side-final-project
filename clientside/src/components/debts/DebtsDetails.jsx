import React, { useState, useEffect } from 'react';
import UpdateDebtsForm from './UpdateDebtsForm'

const DebtsDetails = ({ familyIndex }) => {
  const [debtData, setDebtData] = useState([]);
  const [updatingDebtsDetails, setUpdatingDebtsDetails] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/debts?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((result) => setDebtData(result.data[0]));
  }, [familyIndex]);

  const handleCloseModal = () => {
    setUpdatingDebtsDetails(false);
  }

  return (
    <div className="table-container">
      <h2>חובות</h2>
      {debtData &&<button onClick={() => setUpdatingDebtsDetails(true)}>עריכת פרטים</button>}
      {updatingDebtsDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UpdateDebtsForm familyIndex={familyIndex} onClose={handleCloseModal}  setParentDebts={setDebtData}/>
          </div>
        </div>
      )}
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
          {debtData ? (
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
