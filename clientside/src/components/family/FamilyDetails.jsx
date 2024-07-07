import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChildrenDetails from '../children/ChildrenDetails';
import IncomesDetails from '../incomes/IncomesDetails';
import ExpensesDetails from '../expenses/ExpensesDetails';
import DebtsDetails from '../debts/DebtsDetails';
import SupportsDetails from '../supports/SupportsDetails';
import UpdateFamilyForm from './UpdateFamilyForm';
import UpdateBankForm from '../bank/UpdateBankForm';

const FamilyDetails = () => {
  const { familyIndex } = useParams();
  const navigate = useNavigate();
  const [familyData, setFamilyData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [childrenOn, setChildrenOn] = useState(false);
  const [incomesOn, setIncomesOn] = useState(false);
  const [expensesOn, setExpensesOn] = useState(false);
  const [debtsOn, setDebtsOn] = useState(false);
  const [supportsOn, setSupportsOn] = useState(false);
  const [updatingFamily, setUpdatingFamily] = useState(false);
  const [updatingBank, setUpdatingBank] = useState(false);
  const activeButtons = {
    backgroundColor: '#98b6d7',
    color: 'white'
  };
  const defaultButtons = {
    backgroundColor: 'white',
    color: 'black'
  };
  useEffect(() => {
    fetch(`http://localhost:8080/member?familyIndex=${familyIndex}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => {
        setFamilyData(result.data[0]);
        fetch(`http://localhost:8080/bankAccount?familyIndex=${familyIndex}`, {
          credentials: 'include'
        })
          .then((response) => response.json())
          .then((result) => { setBankData(result.data[0]) });
      });
  }, [familyIndex]);

  const handleCloseModal = () => {
    if (updatingFamily) setUpdatingFamily(false);
    if (updatingBank) setUpdatingBank(false);
  };

  return (
    <>
      <h2 id='main-header'>פרטי משפחה</h2>
      <button onClick={() => setUpdatingFamily(true)}>עריכת פרטים</button>
      {updatingFamily && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UpdateFamilyForm familyIndex={familyIndex} onClose={handleCloseModal} setParentFamilyDetails={setFamilyData}/>
          </div>
        </div>
      )}
      <div className="details-container">
        <div className="detail-row">
          <p>מספר ילדים:    <span>{familyData.numberOfChildren}</span></p>
          <p>מספר ילדים נשואים:    <span>{familyData.numberOfMarriedChildren}</span></p>
          <p>דואר אלקטרוני:    <span>{familyData.email}</span></p>
          <p>מספר טלפון אב:    <span>{familyData.husbandsPhone}</span></p>
          <p>מספר טלפון אם:    <span>{familyData.wifePhone}</span></p>
        </div>
        <div className="detail-row">
          <p>שם האם:    <span>{familyData.wifeName}</span></p>
          <p>מספר זהות אם:    <span>{familyData.wifeId}</span></p>
          <p>תאריך לידת האם:    <span>{familyData.wifeDob && new Date(familyData.wifeDob).toLocaleDateString()}</span></p>
          <p>מקום עבודת האם:    <span>{familyData.wifeOccupationPlace}</span></p>
          <p>מקצוע בעל:    <span>{familyData.husbandOccupation}</span></p>
        </div>
        <div className="detail-row">
          <p>שם האב:    <span>{familyData.husbandName}</span></p>
          <p>מספר זהות אב:    <span>{familyData.husbandId}</span></p>
          <p>תאריך לידת האב:    <span>{familyData.husbandDob && new Date(familyData.husbandDob).toLocaleDateString()}</span></p>
          <p>עיסוק האב:    <span>{familyData.husbandOccupation}</span></p>
          <p>מקום עבודת האב:    <span>{familyData.husbandOccupationPlace}</span></p>
        </div>
        <div className="detail-row">
          <p>שם משפחה:    <span>{familyData.familyName}</span></p>
          <p>מצב משפחתי:    <span>{familyData.familyStatus}</span></p>
          <p>כתובת:    <span>{`${familyData.street} ${familyData.entrance}/${familyData.floor}/${familyData.appartmentNumber}`}</span></p>
          <p>ממליץ:    <span>{familyData.recommender}</span></p>
          <p>מספר טלפון ממליץ:    <span>{familyData.recommendersPhone}</span></p>
        </div>
      </div>    
      <div className='request-container'>
        {familyData ? (          <>
            <p>:תיאור הבקשה</p>
            <span>{familyData.descriptionAndRequest}</span>
          </>
        ) : null}
      </div>
      <h3>פרטי בנק</h3>
      <button onClick={() => setUpdatingBank(true)}>עריכת פרטים</button>
  {
    updatingBank && (
      <div className="modal-overlay">
        <div className="modal-content">
          <UpdateBankForm familyIndex={familyIndex} onClose={handleCloseModal} setParentBankData={setBankData}/>
        </div>
      </div>
    )
  }
      <div className="bank-details">
        <table>
          <tbody>
            <tr>
              <th>בנק</th>
              <th>סניף</th>
              <th>מספר חשבון</th>
            </tr>
            {bankData ? (<tr>
              <td>{bankData.bank}</td>
              <td>{bankData.branch}</td>
              <td>{bankData.account}</td>
            </tr>)
              : (
                <tr>
                  <td colSpan="17">אין נתונים זמינים</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => { navigate(`/family/${familyIndex}/files`); }}>צפה בקבצי המשפחה</button>
      </div>
      <div className='hidden-details'>
        <button style={childrenOn ? activeButtons : defaultButtons} onClick={() => { setChildrenOn(!childrenOn) }}>{!childrenOn ? "טען פרטי ילדים" : "הסתר פרטי ילדים"}</button>
        <button style={incomesOn ? activeButtons : defaultButtons} onClick={() => { setIncomesOn(!incomesOn) }}>{!incomesOn ? "טען הכנסות" : "הסתר הכנסות"}</button>
        <button style={expensesOn ? activeButtons : defaultButtons} onClick={() => { setExpensesOn(!expensesOn) }}>{!expensesOn ? "טען הוצאות" : "הסתר הוצאות"}</button>
        <button style={debtsOn ? activeButtons : defaultButtons} onClick={() => { setDebtsOn(!debtsOn) }}>{!debtsOn ? "טען חובות" : "הסתר חובות"}</button>
        <button style={supportsOn ? activeButtons : defaultButtons} onClick={() => { setSupportsOn(!supportsOn) }}>{!supportsOn ? "טען תמיכות אחרונות" : "הסתר תמיכות אחרונות"}</button>
      </div>
      <div className='hidden-details-tables'>
        <div>
          {childrenOn && <ChildrenDetails familyIndex={familyIndex} />}
        </div>
        <div>
          {incomesOn && <IncomesDetails familyIndex={familyIndex} />}
        </div>
        <div>
          {expensesOn && <ExpensesDetails familyIndex={familyIndex} />}
        </div>
        <div>
          {debtsOn && <DebtsDetails familyIndex={familyIndex} />}
        </div>
        <div>
          {supportsOn && <SupportsDetails familyIndex={familyIndex} />}
        </div>
      </div>
    </>
  );
};

export default FamilyDetails;

