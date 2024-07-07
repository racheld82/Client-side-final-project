import React, { useState, useEffect } from 'react';
import AddSupportForm from './AddSupportForm';

const SupportsDetails = ({familyIndex}) => {   
  const [supportData, setSupportData] = useState([]);
  const [addingSupport, setAddingSupport] = useState(false);

  useEffect(() => {
    let url="";
    if(familyIndex) url=`http://localhost:8080/supports?familyIndex=${familyIndex}`
    else url=`http://localhost:8080/supports`
    fetch(url, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => setSupportData(result.data));
  }, []);

  const handleCloseModal = () => {
    setAddingSupport(false);
  }

  return (
    <div className="table-container">
      <h2>תמיכות אחרונות</h2>
      {familyIndex ? (<>
        <button onClick={() => setAddingSupport(true)}>הוסף תמיכה</button>
      {addingSupport &&
        <div className="modal-overlay">
          <div className="modal-content">
            <AddSupportForm familyIndex={familyIndex} onClose={handleCloseModal} setParentSupports={setSupportData}/>
          </div>
        </div>
      }
      </>) : <></>}
      <table >
        <thead>
          <tr>
            <th>ארגון</th>
            <th>סכום תמיכה</th>
            <th>תאריך תמיכה</th>
          </tr>
        </thead>
        <tbody>
          {supportData.length > 0 ? (
            supportData.map((support) => (
              <tr key={support.dateOfSupport}>
                <td>{support.organization}</td>
                <td>{support.sumOfSupport}</td>
                <td>{new Date(support.dateOfSupport).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">אין נתוני תמיכות אחרונות זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupportsDetails;
