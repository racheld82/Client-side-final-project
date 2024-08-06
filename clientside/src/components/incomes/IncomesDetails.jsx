import React, { useState, useEffect } from 'react';
import UpdateIncomesForm from './UpdateIncomesForm';
import AddIncomesForm from './AddIncomeForm';

const IncomesDetails = ({ familyIndex }) => {
  const [incomeData, setIncomeData] = useState(null); // השתמש ב-null במקום []
  const [lastYearIncomeData, setLastYearIncomeData] = useState(null); // השתמש ב-null במקום []
  const [updatingIncomes, setUpdatingIncomes] = useState(false);
  const YEAR = 2024;

  useEffect(() => {
    fetch(`http://localhost:8080/incomes?familyIndex=${familyIndex}&year=${YEAR}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => setIncomeData(result.data[0]))
      .catch(error => {
        console.error('Error fetching current year income data:', error);
        setIncomeData(null); // במקרה של שגיאה, קבע את המידע ל-null
      });

    // קבלת נתוני השנה הקודמת
    fetch(`http://localhost:8080/incomes?familyIndex=${familyIndex}&year=${YEAR - 1}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => setLastYearIncomeData(result.data[0])) // עדכן בהתאם למבנה הנתונים
      .catch(error => {
        console.error('Error fetching previous year income data:', error);
        setLastYearIncomeData(null); // במקרה של שגיאה, קבע את המידע ל-null
      });

  }, [familyIndex]);

  const IncomesMonitor = () => {
    if (!incomeData || !lastYearIncomeData) {
      return 'לא ניתן לחשב שינויים, נתונים חסרים';
    }

    const incomeDifference = incomeData.totalIncomes - lastYearIncomeData.totalIncomes;
    const incomeChangePercentage = (incomeDifference / lastYearIncomeData.totalIncomes) * 100;

    if (incomeDifference > 0) {
      return `ההכנסות גדלו ב ${incomeChangePercentage.toFixed(2)}%`;
    } else if (incomeDifference < 0) {
      return `ההכנסות קטנו ב ${Math.abs(incomeChangePercentage.toFixed(2))}%`;
    } else {
      return `ההכנסות לא השתנו משנה לשנה`;
    }
  };

  const handleCloseModal = () => {
    setUpdatingIncomes(false);
  };

  return (
    <div className="table-container">
      <h3>הכנסות</h3>
      <button onClick={() => setUpdatingIncomes(true)}>עריכת פרטים</button>
      {updatingIncomes && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddIncomesForm familyIndex={familyIndex} onClose={handleCloseModal} YEAR={YEAR} />
          </div>
        </div>
      )}
      <div className='incomes-table'>
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
              <th>שנה</th>
            </tr>
          </thead>
          <tbody>
            {incomeData ? (
              <tr>
                <td>{incomeData.husbandIncomesSum}</td>
                <td>{incomeData.wifeIncomesSum}</td>
                <td>{incomeData.additionalIncomesDescription}</td>
                <td>{incomeData.additionalIncomesSum}</td>
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
                <td>{YEAR}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="14">אין נתוני הכנסות זמינים</td>
              </tr>
            )}
            {lastYearIncomeData ? (
              <tr>
                <td>{lastYearIncomeData.husbandIncomesSum}</td>
                <td>{lastYearIncomeData.wifeIncomesSum}</td>
                <td>{lastYearIncomeData.additionalIncomesDescription}</td>
                <td>{lastYearIncomeData.additionalIncomesSum}</td>
                <td>{lastYearIncomeData.childAllowance}</td>
                <td>{lastYearIncomeData.residualAllowance}</td>
                <td>{lastYearIncomeData.disabilityFund}</td>
                <td>{lastYearIncomeData.guaranteedIncome}</td>
                <td>{lastYearIncomeData.rentAssitance}</td>
                <td>{lastYearIncomeData.alimony}</td>
                <td>{lastYearIncomeData.familySupport}</td>
                <td>{lastYearIncomeData.charitySupport}</td>
                <td>{lastYearIncomeData.propertyIncomes}</td>
                <td>{lastYearIncomeData.totalIncomes}</td>
                <td>{YEAR - 1}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="14">אין נתוני הכנסות קודמים זמינים</td>
              </tr>
            )}
          </tbody>
        </table>
        {incomeData && lastYearIncomeData ? <p>{IncomesMonitor()}</p> : null}
      </div>
    </div>
  );
};

export default IncomesDetails;
