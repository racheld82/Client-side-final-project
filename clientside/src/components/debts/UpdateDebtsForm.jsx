import React, { useState, useEffect } from 'react';

const UpdateBankForm = ({ familyIndex, onClose, setParentDebts }) => {
  const [debtsData, setDebtsData] = useState({});

  useEffect(() => {    
    
    fetch(`http://localhost:8080/debts?familyIndex=${familyIndex}`)
      .then(response => response.json())
      .then(result => {setDebtsData(result.data[0])});
  }, [familyIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;       
    setDebtsData({ ...debtsData, [name]: value });
  };

  const handleSubmit = (e) => {    
    e.preventDefault();
    fetch(`http://localhost:8080/debts/${familyIndex}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(debtsData),
    })
      .then(response => response.json())
      .then(data => {
        setParentDebts(debtsData);
        console.log('Debts details updated:', data);        
      })
      .catch(error => {
        console.error('Error updating debts:', error);        
      });
    onClose();
  };  

  return (
    <div>
      <h2>עדכון פרטי חובות</h2>
      <form onSubmit={handleSubmit} className='edit-form'>
      <label>:משכנתא - חוב</label>
        <input type="number" name="mortgageDebt" value={debtsData.mortgageDebt} onChange={handleInputChange} />

        <label>:משכנתא - תשלומים חודשיים</label>
        <input type="number" name="mortgageRepayments" value={debtsData.mortgageRepayments} onChange={handleInputChange} />

        <label>:גמ"ח - חוב</label>
        <input type="number" name="gmachDebt" value={debtsData.gmachDebt} onChange={handleInputChange} />

        <label>:גמ"ח - תשלומים חודשיים</label>
        <input type="number" name="gmachRepayments" value={debtsData.gmachRepayments} onChange={handleInputChange} />

        <label>:הלוואות בנקאיות - חוב</label>
        <input type="number" name="bankLoansDebt" value={debtsData.bankLoansDebt} onChange={handleInputChange} />

        <label>:הלוואות בנקאיות - תשלומים חודשיים</label>
        <input type="number" name="bankLoansRepayments" value={debtsData.bankLoansRepayments} onChange={handleInputChange} />

        <label>:הלוואות פרטיות - חוב</label>
        <input type="number" name="outstandingLoansDebt" value={debtsData.outstandingLoansDebt} onChange={handleInputChange} />

        <label>:הלוואות פרטיות - תשלומים חודשיים</label>
        <input type="number" name="outstandingLoansRepayments" value={debtsData.outstandingLoansRepayments} onChange={handleInputChange} />
        <button type="submit" onClick={handleSubmit}>עדכון פרטי חובות</button>
        <button onClick={() => {onClose();}}>ביטול</button>
      </form>
    </div>
  );
};

export default UpdateBankForm;