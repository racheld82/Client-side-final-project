import React, {useState} from 'react';
const AddChildForm = ({familyIndex, onClose, setChildrenData}) => {
    const [childName, setChildName] = useState('');
    const [childId, setChildId] = useState(null);
    const [childDOB, setChildDOB] = useState('');
    const [schoolOrJobPlace, setSchoolOrJobPlace] = useState('');
    const [educationCosts, setEducationCosts] = useState(null);
    const [childIncomes, setChildIncomes] = useState(null);
    const [additionalExpensesDescription, setAdditionalExpensesDescription] = useState('');
    const [additionalExpensesSum, setAdditionalExpensesSum] = useState(null);
  
    const handleSave = () => {      
      const newChild = {
        familyIndex: familyIndex, 
        childId,
        childName,
        childDOB,
        schoolOrJobPlace,
        educationCosts,
        childIncomes,
        additionalExpensesDescription,
        additionalExpensesSum,
      };
      console.log("object before posting: ", newChild);
      fetch(`http://localhost:8080/children`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChild),
      })
      .then(response => response.json())
      .then(data => {        
        setChildrenData(prev => [...prev, newChild]);        
        setChildName('');
        setChildDOB('');
        setSchoolOrJobPlace('');
        setEducationCosts(null);
        setChildIncomes(null);
        setAdditionalExpensesDescription('');
        setAdditionalExpensesSum(null);
        onClose();
      })
      .catch(error => console.error('Error adding child:', error));
    };

    return (
      <div className='container'>
        <h2>הוספת ילד חדש</h2>
        <label>:שם ילד</label>
        <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} />
        <label>:תעודת זהות</label>
        <input type='number' value={childId || ''} onChange={(e) => setChildId(Number(e.target.value))} />
        <label>:תאריך לידה</label>
        <input type="date" value={childDOB} onChange={(e) => setChildDOB(e.target.value)} />
        <label>:מקום לימודים או עבודה</label>
        <input type="text" value={schoolOrJobPlace} onChange={(e) => setSchoolOrJobPlace(e.target.value)} />
        <label>:הוצאות חינוך</label>
        <input type="number" value={educationCosts || ''} onChange={(e) => setEducationCosts(Number(e.target.value))} />
        <label>:הכנסות ילד</label>
        <input type="number" value={childIncomes || ''} onChange={(e) => setChildIncomes(Number(e.target.value))} />
        <label>:תיאור הוצאות נוספות</label>
        <input type="text" value={additionalExpensesDescription} onChange={(e) => setAdditionalExpensesDescription(e.target.value)} />
        <label>:סכום הוצאות נוספות</label>
        <input type="number" value={additionalExpensesSum || ''} onChange={(e) => setAdditionalExpensesSum(Number(e.target.value))} />
        <button onClick={handleSave}>שמור</button>
        <button onClick={onClose}>ביטול</button>
      </div>
    );
  };

export default AddChildForm
  