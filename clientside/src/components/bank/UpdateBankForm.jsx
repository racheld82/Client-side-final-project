import React, { useState, useEffect } from 'react';

const UpdateBankForm = ({ familyIndex, onClose }) => {
  const [bankData, setBankData] = useState({});

  useEffect(() => {    
    
    fetch(`http://localhost:8080/bankAccount?familyIndex=${familyIndex}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {setBankData(result.data[0])});
  }, [familyIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;       
    setBankData({ ...bankData, [name]: value });
  };

  const handleSubmit = (e) => {    
    e.preventDefault();
    fetch(`http://localhost:8080/bankAccount/${familyIndex}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bankData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Bank account details updated:', data);        
      })
      .catch(error => {
        console.error('Error updating band account:', error);        
      });
    onClose();
  };  

  return (
    <div>
      <h2>עדכון פרטי חשבון בנק</h2>
      <form onSubmit={handleSubmit} className='edit-form'>
        <label>:בנק</label>
        <input type="text" name="bank" defaultValue={bankData.bank} onChange={handleInputChange} required />

        <label>:סניף</label>
        <input type="number" name="branch" defaultValue={bankData.branch} onChange={handleInputChange} />

        <label>:מספר חשבון</label>
        <input type="number" name="account" defaultValue={bankData.account} onChange={handleInputChange} />

        <button type="submit">עדכן פרטים</button>
        <button onClick={() => {onClose();}}>ביטול</button>
      </form>
    </div>
  );
};

export default UpdateBankForm;