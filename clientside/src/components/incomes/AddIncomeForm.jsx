import React, { useState } from 'react';

const AddIncomeForm = ({ familyIndex, YEAR, onClose }) => {
  const [incomeData, setIncomeData] = useState({
    familyIndex: familyIndex,
    husbandIncomesSum: 0,
    wifeIncomesSum: 0,
    additionalIncomesDescription: 0,
    additionalIncomesSum: 0,
    childAllowance: 0,
    residualAllowance: 0,
    disabilityFund: 0,
    guaranteedIncome: 0,
    rentAssitance: 0,
    alimony: 0,
    familySupport: 0,
    charitySupport: 0,
    propertyIncomes: 0,
    totalIncomes: 0 
  });

  const calculateTotalIncome = () => {
    return [
      'husbandIncomesSum',
      'wifeIncomesSum',
      'additionalIncomesSum',
      'childAllowance',
      'residualAllowance',
      'disabilityFund',
      'guaranteedIncome',
      'rentAssitance',
      'alimony',
      'familySupport',
      'charitySupport',
      'propertyIncomes'
    ].reduce((acc, key) => acc + (parseFloat(incomeData[key]) || 0), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalIncome = calculateTotalIncome();

    const updatedIncomeData = {
      ...incomeData,
      totalIncomes: totalIncome
    };

    fetch(`http://localhost:8080/incomes/${YEAR}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedIncomeData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Income added:', data);
        if (onClose) onClose();
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
        <input type="text" name="additionalIncomesDescription" value={incomeData.additionalIncomesDescription} onChange={handleInputChange} />

        <label>סכום הכנסות נוספות:</label>
        <input type="number" name="additionalIncomesSum" value={incomeData.additionalIncomesSum} onChange={handleInputChange} />

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

        <label>סך הכל הכנסות:</label>
        <input type="number" name="totalIncomes" value={calculateTotalIncome()} readOnly />

        <button type="submit">הוסף הכנסה</button>
        <button type="button" onClick={onClose}>ביטול</button>
      </form>
    </div>
  );
};

export default AddIncomeForm;
