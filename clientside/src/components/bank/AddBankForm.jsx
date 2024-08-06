import React, { useState } from 'react';

const AddBankForm = ({ familyIndex }) => {
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState(0);
  const [account, setAccount] = useState(0);

  const handleSubmit = (e) => {    
    e.preventDefault();
    const bankData = {
      familyIndex: familyIndex,
      bank: bank,
      branch: branch,
      account: account
    };
    fetch(`http://localhost:8080/bankAccount`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bankData),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error adding bank account:', error);        
      });
  };

  return (
    <div>
      <h2>הוספת פרטי חשבון בנק</h2>
      <form onSubmit={handleSubmit} className='edit-form'>
        <label>:בנק</label>
        <input type="text" name="bank" onChange={(e) => setBank(e.target.value)} required />

        <label>:סניף</label>
        <input type="number" name="branch" onChange={(e) => setBranch(parseInt(e.target.value, 10))} required />

        <label>:מספר חשבון</label>
        <input type="number" name="account" onChange={(e) => setAccount(parseInt(e.target.value, 10))} required/>

        <button type="submit">שלח פרטים</button>
      </form>
    </div>
  );
};

export default AddBankForm;
