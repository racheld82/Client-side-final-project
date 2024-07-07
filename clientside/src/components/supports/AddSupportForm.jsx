import React, { useState } from 'react';

const AddSupportForm = ({ familyIndex, onClose, setParentSupports }) => {
  console.log("familyIndex: ", familyIndex)
  const [supportData, setSupportData] = useState({
    familyIndex: familyIndex,
    organization: '',
    sumOfSupport: '',
    dateOfSupport:''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupportData({ ...supportData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/supports`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supportData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Support added:', data);
        setParentSupports(prev => [...prev, supportData]);
        onClose();        
      })
      .catch(error => {
        console.error('Error adding support:', error);       
      });
  };

  return (
    <div>
      <h2>הוספת תמיכה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <label>:ארגון</label>
        <input type="text" name="organization" value={supportData.organization || ''} onChange={handleInputChange} required />
        <label>:סכום תמיכה</label>
        <input type="number" name="sumOfSupport" value={supportData.sumOfSupport || ''} onChange={handleInputChange} required />
        <label>:תאריך</label>
        <input type="date" name="dateOfSupport" value={supportData.dateOfSupport} onChange={handleInputChange} required />
        <button type="submit">הוסף תמיכה</button>
        <button onClick={() => onClose()}>ביטול</button>
      </form>
    </div>
  );
};

export default AddSupportForm;
