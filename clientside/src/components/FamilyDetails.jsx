import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChildrenDetails from './ChildrenDetails';
import IncomesDetails from './IncomesDetails';
import ExpensesDetails from './ExpensesDetails';
import DebtsDetails from './DebtsDetails';
import SupportsDetails from './SupportsDetails';


const FamilyDetails = () => {
  const { familyIndex } = useParams();
  const navigate = useNavigate();
  const [familyData, setFamilyData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [childrenOn, setChildrenOn] = useState(false);
  const [incomesOn, setIncomesOn] = useState(false);
  const [expensesOn, setExpensesON] = useState(false);
  const [debtsOn, setDebtsOn] = useState(false);
  const [supportsOn, setSupportsOn] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/member?familyIndex=${familyIndex}`)
      .then((response) => response.json())
      .then((result) => {
        setFamilyData(result.data[0]);
        fetch(`http://localhost:8080/bankAccount?familyIndex=${familyIndex}`)
          .then((response) => response.json())
          .then((result) => { setBankData(result.data[0]) });
      });
  }, [familyIndex]);

  return (
    <div>
      <h2>פרטי משפחה</h2>
      <div className="table-container">
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
            </tr>
          </thead>
          <tbody>
            {familyData ? (
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
              </tr>
            ) : (
              <tr>
                <td colSpan="17">אין נתונים זמינים</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='request-container'>

        {familyData ? <>
          <p>:תיאור הבקשה</p>
          <p>{familyData.descriptionAndRequest}</p></> : null}

      </div>
      <h3>פרטי בנק</h3>
      <div className="bank-details">
        <table>
          <tbody>
            <tr>
              <th>בנק</th>
              <th>סניף</th>
              <th>מספר חשבון</th>
            </tr>
            <tr>
              <td>{bankData.bank}</td>
              <td>{bankData.branch}</td>
              <td>{bankData.account}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => {navigate(`/family/${familyIndex}/files`);}}>צפה בקבצי המשפחה</button>        
      </div>
      <div className='hidden-details'>
        <div>
          <button onClick={() => { setChildrenOn(!childrenOn) }}>{!childrenOn ? "טען פרטי ילדים" : "הסתר פרטי ילדים"}</button>
          {childrenOn && <ChildrenDetails familyIndex={familyIndex} />}
        </div>
        <div>
          <button onClick={() => { setIncomesOn(!incomesOn) }}>{!incomesOn ? "טען הכנסות" : "הסתר הכנסות"}</button>
          {incomesOn && <IncomesDetails familyIndex={familyIndex} />}
        </div>
        <div>
          <button onClick={() => { setExpensesON(!expensesOn) }}>{!expensesOn ? "טען הוצאות" : "הסתר הוצאות"}</button>
          {expensesOn && <ExpensesDetails familyIndex={familyIndex} />}
        </div>
        <div>
          <button onClick={() => { setDebtsOn(!debtsOn) }}>{!debtsOn ? "טען חובות" : "הסתר חובות"}</button>
          {debtsOn && <DebtsDetails familyIndex={familyIndex} />}
        </div>
        <div>
          <button onClick={() => { setSupportsOn(!supportsOn) }}>{!supportsOn ? "טען תמיכות אחרונות" : "הסתר תמיכות אחרונות"}</button>
          {supportsOn && <SupportsDetails familyIndex={familyIndex} />}
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default FamilyDetails;
