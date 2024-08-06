import React, { useState, useEffect } from 'react';
import AddBankForm from './AddBankForm';

const UpdateBankForm = ({ familyIndex, onClose, setParentBankData }) => {
  const [bankData, setBankData] = useState(null);

  useEffect(() => {    
    fetch(`http://localhost:8080/bankAccount?familyIndex=${familyIndex}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        const data = result.data[0];
        setBankData(data);
      });
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
        setParentBankData(bankData);
        console.log('Bank account details updated:', data);        
      })
      .catch(error => {
        console.error('Error updating bank account:', error);        
      });
    onClose();
  };  

  return (
    <>
    {bankData?
    <div>
      <h2>עדכון פרטי חשבון בנק</h2>
      <form onSubmit={handleSubmit} className='edit-form'>
        <label>:בנק</label>
        <input type="text" name="bank" defaultValue={bankData.bank || ''} onChange={handleInputChange} required />

        <label>:סניף</label>
        <input type="number" name="branch" defaultValue={bankData.branch || 0} onChange={handleInputChange} />

        <label>:מספר חשבון</label>
        <input type="number" name="account" defaultValue={bankData.account || 0} onChange={handleInputChange} />

        <button type="submit">עדכן פרטים</button>
        <button type="button" onClick={onClose}>ביטול</button>
      </form>
    </div>:
    <AddBankForm  familyIndex={familyIndex}/>}
    </>
  );
};

export default UpdateBankForm;
