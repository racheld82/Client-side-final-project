import React, { useState } from 'react';

const UpdateChildForm = ({ child, onClose, forceUpdate, setChildrenData, childrenData }) => {
  const [childName, setChildName] = useState(child.childName);
  const [childDOB, setChildDOB] = useState(child.childDOB);
  const [schoolOrJobPlace, setSchoolOrJobPlace] = useState(child.schoolOrJobPlace);
  const [educationCosts, setEducationCosts] = useState(child.educationCosts);
  const [childIncomes, setChildIncomes] = useState(child.childIncomes);
  const [additionalExpensesDescription, setAdditionalExpensesDescription] = useState(child.additionalExpensesDescription);
  const [additionalExpensesSum, setAdditionalExpensesSum] = useState(child.additionalExpensesSum);
  

  const handleUpdate = () => {
    const formattedChildDob = fixFormatOfDob();
    const updatedChild = {
      childId: child.childId,
      childName,
      childDOB: formattedChildDob,
      schoolOrJobPlace,
      educationCosts,
      childIncomes,
      additionalExpensesDescription,
      additionalExpensesSum,
    };
    console.log("child obj for update: ", updatedChild)
    fetch(`http://localhost:8080/children/${child.familyIndex}/${child.childId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedChild),
    })
    .then(response => response.json())
    .then(data => {        
      const updatedChildren = childrenData.map(c => (c.childId === data.childId ? data : c));
      setChildrenData(updatedChildren);
      forceUpdate(); // Force the parent component to re-render
      onClose(); // Close the modal
    })
    .catch(error => console.error('Error updating child:', error));  
  };

  const fixFormatOfDob = () => {
    return child.childDOB.slice(0, child.childDOB.indexOf('T'));   
  }

  return (
    <div>
      <h2>עדכון פרטי ילד</h2>
      <label>שם ילד:</label>
      <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} />
      <label>תאריך לידה:</label>
      <input type="date" value={childDOB} onChange={(e) => setChildDOB(e.target.value)} />
      <label>מקום לימודים או עבודה:</label>
      <input type="text" value={schoolOrJobPlace} onChange={(e) => setSchoolOrJobPlace(e.target.value)} />
      <label>הוצאות חינוך:</label>
      <input type="number" value={educationCosts || ''} onChange={(e) => setEducationCosts(Number(e.target.value))} />
      <label>הכנסות ילד:</label>
      <input type="number" value={childIncomes || ''} onChange={(e) => setChildIncomes(Number(e.target.value))} />
      <label>תיאור הוצאות נוספות:</label>
      <input type="text" value={additionalExpensesDescription} onChange={(e) => setAdditionalExpensesDescription(e.target.value)} />
      <label>סכום הוצאות נוספות:</label>
      <input type="number" value={additionalExpensesSum || ''} onChange={(e) => setAdditionalExpensesSum(Number(e.target.value))} />
      <button onClick={handleUpdate}>עדכן</button>
      <button onClick={onClose}>סגור</button>
    </div>
  );
};

export default UpdateChildForm;

