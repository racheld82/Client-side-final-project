import React, { useState } from 'react';

const AddDebtForm = ({ familyIndex }) => {
  const [debtData, setDebtData] = useState({
    familyIndex: familyIndex,
    mortgageDebt: '',
    mortgageRepayments: '',
    gmachDebt: '',
    gmachRepayments: '',
    bankLoansDebt: '',
    bankLoansRepayments: '',
    outstandingLoansDebt: '',
    outstandingLoansRepayments: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDebtData({ ...debtData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/debts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(debtData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Debt added:', data);
        // אפשר להוסיף פה ניווט או פעולות נוספות לאחר ההוספה
      })
      .catch(error => {
        console.error('Error adding debt:', error);
        // טיפול בשגיאות
      });
  };

  return (
    <div>
      <h2>הוספת חוב חדש</h2>
      <form onSubmit={handleSubmit}>
        <label>משכנתא - חוב:</label>
        <input type="number" name="mortgageDebt" value={debtData.mortgageDebt} onChange={handleInputChange} />

        <label>משכנתא - תשלומים חודשיים:</label>
        <input type="number" name="mortgageRepayments" value={debtData.mortgageRepayments} onChange={handleInputChange} />

        <label>גמ"ח - חוב:</label>
        <input type="number" name="gmachDebt" value={debtData.gmachDebt} onChange={handleInputChange} />

        <label>גמ"ח - תשלומים חודשיים:</label>
        <input type="number" name="gmachRepayments" value={debtData.gmachRepayments} onChange={handleInputChange} />

        <label>הלוואות בנקאיות - חוב:</label>
        <input type="number" name="bankLoansDebt" value={debtData.bankLoansDebt} onChange={handleInputChange} />

        <label>הלוואות בנקאיות - תשלומים חודשיים:</label>
        <input type="number" name="bankLoansRepayments" value={debtData.bankLoansRepayments} onChange={handleInputChange} />

        <label>הלוואות פרטיות - חוב:</label>
        <input type="number" name="outstandingLoansDebt" value={debtData.outstandingLoansDebt} onChange={handleInputChange} />

        <label>הלוואות פרטיות - תשלומים חודשיים:</label>
        <input type="number" name="outstandingLoansRepayments" value={debtData.outstandingLoansRepayments} onChange={handleInputChange} />

        <button type="submit">הוסף חוב</button>
      </form>
    </div>
  );
};

export default AddDebtForm;
