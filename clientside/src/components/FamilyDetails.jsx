import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FamilyDetails = ({ familyIndex }) => {
  const [familyData, setFamilyData] = useState([]);
  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/member/?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((data) => {
        setFamilyData(data);
        fetch(`http://localhost:8080/bankAccount/${familyIndex}`)
          .then((response) => response.json())
          .then((data) => setBankData(data));
      });
  }, [familyIndex]);

  return (
    <div>
      <h2>פרטי משפחה</h2>
      <table>
        <thead>
          <tr>
            <th>שם משפחה</th>
            <th>שם בעל</th>
            <th>שם אישה</th>
            <th>תאריך לידה בעל</th>
            <th>תאריך לידה אישה</th>
            <th>מצב משפחתי</th>
            <th>מספר ילדים</th>
            <th>מספר ילדים נשואים</th>
            <th>כתובת</th>
            <th>מספר טלפון בעל</th>
            <th>מספר טלפון אישה</th>
            <th>דואר אלקטרוני</th>
            <th>מקצוע בעל</th>
            <th>מקום עבודה בעל</th>
            <th>מקום עבודה אישה</th>
            <th>ממליץ</th>
            <th>מספר טלפון ממליץ</th>
            <th>תיאור ובקשה</th>
            <th>בנק</th>
            <th>סניף</th>
            <th>מספר חשבון</th>
          </tr>
        </thead>
        <tbody>
          {familyData.length > 0 ? (
            <tr>
              <td>{familyData.familyName}</td>
              <td>{familyData.husbandName}</td>
              <td>{familyData.wifeName}</td>
              <td>{familyData.husbandDob && new Date(familyData.husbandDob).toLocaleDateString()}</td>
              <td>{familyData.wifeDob && new Date(familyData.wifeDob).toLocaleDateString()}</td>
              <td>{familyData.familyStatus}</td>
              <td>{familyData.numberOfChildren}</td>
              <td>{familyData.numberOfMarriedChildren}</td>
              <td>{`${familyData.street} ${familyData.entrance}/${familyData.floor}/${familyData.appartmentNumber}`}</td>
              <td>{familyData.husbandsPhone}</td>
              <td>{familyData.wifePhone}</td>
              <td>{familyData.email}</td>
              <td>{familyData.husbandOccupation}</td>
              <td>{familyData.husbandOccupationPlace}</td>
              <td>{familyData.wifeOccupationPlace}</td>
              <td>{familyData.recommender}</td>
              <td>{familyData.recommendersPhone}</td>
              <td>{familyData.descriptionAndRequest}</td>
              <td>{bankData.bank}</td>
              <td>{bankData.branch}</td>
              <td>{bankData.account}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="23">אין נתונים זמינים</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Link to={`/children/${familyId}`}>טען פרטי ילדים</Link>
        <Link to={`/income/${familyId}`}>טען הכנסות</Link>
        <Link to={`/expenses/${familyId}`}>טען הוצאות</Link>
        <Link to={`/debts/${familyId}`}>טען חובות</Link>
        <Link to={`/supports/${familyId}`}>טען תמיכות אחרונות</Link>
      </div>
    </div>
  );
};

export default FamilyDetails;
