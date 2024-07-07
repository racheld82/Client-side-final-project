import React, { useState, useEffect, useReducer } from 'react';
import UpdateChildForm from './UpdateChildForm';
import AddChildForm from './AddChildForm'

const ChildrenDetails = ({ familyIndex }) => {
  const [childrenData, setChildrenData] = useState([]);
  const [updatingChild, setUpdatingChild] = useState(null);
  const [addingChild, setAddingChild] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fetch(`http://localhost:8080/children?familyIndex=${familyIndex},`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => setChildrenData(result.data));
  }, [familyIndex]);

  const handleDisplayUpdateForm = (childObj) => {
    setUpdatingChild(childObj);
  }

  const handleCloseModal = () => {
    if(updatingChild) setUpdatingChild(false);
    if(addingChild) setAddingChild(false);
  }

  const handleDelete = (childId) => {
    fetch(`http://localhost:8080/children/${familyIndex}/${childId}`, { method: 'DELETE', credentials: 'include'})
      .then((response) => response.json())
      .then(() => {
        setChildrenData(prevChildrenData => prevChildrenData.filter(child => child.childId !== childId));
        forceUpdate();
      })
      .catch(error => { console.error("error deleteing child: ", error) });
  }

  return (
    <div className="table-container">
      <h2>פרטי ילדים</h2>
      <button onClick={() => setAddingChild(true)}>הוסף ילד</button>
      {
        addingChild &&
        <div className="modal-overlay">
          <div className="modal-content">
            <AddChildForm familyIndex={familyIndex} onClose={handleCloseModal} setChildrenData={setChildrenData}/>
          </div>
        </div>
      }
      {updatingChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UpdateChildForm
              child={updatingChild}
              onClose={handleCloseModal}
              forceUpdate={forceUpdate}
              setChildrenData={setChildrenData}
              childrenData={childrenData}
            />
          </div>
        </div>
      )}
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
            <th>עדכן פרטי ילד</th>
            <th>מחק ילד</th>
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
                <td>{child.additionalExpensesDescription}</td>
                <td>{child.additionalExpensesSum}</td>
                <td><button onClick={() => handleDisplayUpdateForm(child)}>עריכת פרטים</button></td>
                <td><button onClick={() => handleDelete(child.childId)}>מחיקה</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">אין נתוני ילדים זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenDetails;

