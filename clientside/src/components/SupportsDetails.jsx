import React, { useState, useEffect } from 'react';

const SupportsDetails = ({ familyIndex }) => {
  const [supportData, setSupportData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/supports/?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((data) => setSupportData(data));
  }, [familyIndex]);

  return (
    <div>
      <h2>תמיכות אחרונות</h2>
      <table>
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
