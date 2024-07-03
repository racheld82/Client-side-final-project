import React, { useState, useEffect } from 'react';

const ChildrenDetails = ({ familyIndex }) => {
  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/children?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((data) => setChildrenData(data));
  }, [familyIndex]);

  return (
    <div className="table-container">
      <h2>פרטי ילדים</h2>
      <table>
        <thead>
          <tr>
            <th>שם ילד</th>
            <th>תאריך לידה</th>
            <th>מקום לימודים/עבודה</th>
            <th>הוצאות חינוך</th>
            <th>הכנסות ילד</th>
            <th>תיאור הוצאות נוספות</th>
            <th>סכום הוצאות נוספות</th>
          </tr>
        </thead>
        <tbody>
          {childrenData.length > 0 ? (
            childrenData.map((child) => (
              <tr key={child.childId}>
                <td>{child.childName}</td>
                <td>{new Date(child.childDOB).toLocaleDateString()}</td>
                <td>{child.schoolOrJobPlace}</td>
                <td>{child.educationCosts}</td>
                <td>{child.childIncomes}</td>
                <td>{child.addtionalExpensesDescription}</td>
                <td>{child.addtionalExpensesSum}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">אין נתוני ילדים זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenDetails;
