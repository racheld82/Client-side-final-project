import React, { useState } from 'react';

const AddIncomeForm = ({ familyIndex }) => {
  const [incomeData, setIncomeData] = useState({
    familyIndex: familyIndex,
    husbandIncomesSum: '',
    wifeIncomesSum: '',
    addtionalIncomesDescription: '',
    addtionalIncomesSum: '',
    childAllowance: '',
    residualAllowance: '',
    disabilityFund: '',
    guaranteedIncome: '',
    rentAssitance: '',
    alimony: '',
    familySupport: '',
    charitySupport: '',
    propertyIncomes: '',
    totalIncomes: '',
  });
  const [totalIncome, setTotalIncome]=useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name!='addtionalIncomesDescription')
      setTotalIncome(totalIncome+value);
    setIncomeData({ ...incomeData, [name]: value });

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIncomeData({ ...incomeData, [totalIncomes]: totalIncome });
    fetch('http://localhost:8080/incomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incomeData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Income added:', data);
      })
      .catch(error => {
        console.error('Error adding income:', error);
      });
  };

  return (
    <div>
      <h2>הוספת הכנסה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <label>הכנסות בעל:</label>
        <input type="number" name="husbandIncomesSum" value={incomeData.husbandIncomesSum} onChange={handleInputChange} required />

        <label>הכנסות אישה:</label>
        <input type="number" name="wifeIncomesSum" value={incomeData.wifeIncomesSum} onChange={handleInputChange} required />

        <label>תיאור הכנסות נוספות:</label>
        <input type="text" name="addtionalIncomesDescription" value={incomeData.addtionalIncomesDescription} onChange={handleInputChange} />

        <label>סכום הכנסות נוספות:</label>
        <input type="number" name="addtionalIncomesSum" value={incomeData.addtionalIncomesSum} onChange={handleInputChange} />

        <label>קצבאות ילדים:</label>
        <input type="number" name="childAllowance" value={incomeData.childAllowance} onChange={handleInputChange} />

        <label>קצבת הבטחת הכנסה:</label>
        <input type="number" name="residualAllowance" value={incomeData.residualAllowance} onChange={handleInputChange} />

        <label>גמ״ח:</label>
        <input type="number" name="disabilityFund" value={incomeData.disabilityFund} onChange={handleInputChange} />

        <label>הכנסה ערוב:</label>
        <input type="number" name="guaranteedIncome" value={incomeData.guaranteedIncome} onChange={handleInputChange} />

        <label>סיוע בשכר דירה:</label>
        <input type="number" name="rentAssitance" value={incomeData.rentAssitance} onChange={handleInputChange} />

        <label>מזונות:</label>
        <input type="number" name="alimony" value={incomeData.alimony} onChange={handleInputChange} />

        <label>תמיכה ממשפחה:</label>
        <input type="number" name="familySupport" value={incomeData.familySupport} onChange={handleInputChange} />

        <label>תרומות:</label>
        <input type="number" name="charitySupport" value={incomeData.charitySupport} onChange={handleInputChange} />

        <label>הכנסות מנכסים:</label>
        <input type="number" name="propertyIncomes" value={incomeData.propertyIncomes} onChange={handleInputChange} />

        {/* <label>סך הכל הכנסות:</label>
        <input type="number" name="totalIncomes" value={incomeData.totalIncomes} onChange={handleInputChange} required /> */}

        <button type="submit">הוסף הכנסה</button>
      </form>
    </div>
  );
};

export default AddIncomeForm;
