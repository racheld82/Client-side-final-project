import React, { useState } from 'react';
import AddChildForm from '../children/AddChildForm';
import AddExpenseForm from '../expenses/AddExpenseForm';
import AddIncomeForm from '../incomes/AddIncomeForm';
import AddDebtForm from '../debts/AddDebtForm';
import AddBankForm from '../bank/AddBankForm';


const AddFamilyForm = () => {
  const [familyIndex, setFamilyIndex] = useState(null)
  const [familyData, setFamilyData] = useState({
    familyName: '',
    husbandName: '',
    wifeName: '',
    husbandId: null,
    wifeId: null,
    husbandDob: null,
    wifeDob: null,
    familyStatus: '',
    numberOfChildren: 0,
    numberOfMarriedChildren: 0,
    street: '',
    entrance: '',
    floor: 0,
    appartmentNumber: 0,
    numberOfRooms: 0,
    community: '',
    husbandsPhone: null,
    wifePhone: null,
    homePhone: null,
    email: null,
    husbandOccupation: null,
    husbandOccupationPlace: '',
    wifeOccupationPlace: '',
    recommender: '',
    recommendersPhone: null,
    descriptionAndRequest: '',
    familyLevel: ''

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFamilyData({ ...familyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/member', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(familyData),
    })
      .then(response => response.json())
      .then(data => {
        setFamilyIndex(data);
      })
      .catch(error => {
        console.error('Error adding family:', error);
        // טיפול בשגיאות
      });
  };

  return (
    <div>
      <h2>הוספת משפחה חדשה</h2>
      <form onSubmit={handleSubmit} className='adding-family-form'>
        <label>:שם משפחה</label>
        <input type="text" name="familyName" value={familyData.familyName} onChange={handleInputChange} required />

        <label>:שם בעל</label>
        <input type="text" name="husbandName" value={familyData.husbandName} onChange={handleInputChange} />

        <label>:שם אישה</label>
        <input type="text" name="wifeName" value={familyData.wifeName} onChange={handleInputChange} />

        <label>:תעודת זהות בעל</label>
        <input type="text" name="husbandId" value={familyData.husbandId} onChange={handleInputChange} />

        <label>:תעודת זהות אישה</label>
        <input type="text" name="wifeId" value={familyData.wifeId} onChange={handleInputChange} />

        <label>:תאריך לידה בעל</label>
        <input type="date" name="husbandDob" value={familyData.husbandDob} onChange={handleInputChange} />

        <label>:תאריך לידה אישה</label>
        <input type="date" name="wifeDob" value={familyData.wifeDob} onChange={handleInputChange} />

        <label>:מצב משפחתי</label>
        <select name="familyStatus" value={familyData.familyStatus} onChange={handleInputChange}>
          <option value="">בחר מצב משפחתי</option>
          <option value="נשואים">נשואים</option>
          <option value="גרוש/ה">גרוש/ה</option>
          <option value="אלמנ/ה">אלמנ/ה</option>
          <option value="פרודים">פרודים</option>
        </select>

        <label>:מספר ילדים</label>
        <input type="number" name="numberOfChildren" value={familyData.numberOfChildren} onChange={handleInputChange} />

        <label>:מספר ילדים נשואים</label>
        <input type="number" name="numberOfMarriedChildren" value={familyData.numberOfMarriedChildren} onChange={handleInputChange} />

        <label>:רחוב</label>
        <input type="text" name="street" value={familyData.street} onChange={handleInputChange} />

        <label>:כניסה</label>
        <input type="text" name="entrance" value={familyData.entrance} onChange={handleInputChange} />

        <label>:קומה</label>
        <input type="number" name="floor" value={familyData.floor} onChange={handleInputChange} />

        <label>:מספר דירה</label>
        <input type="number" name="appartmentNumber" value={familyData.appartmentNumber} onChange={handleInputChange} />

        <label>:מספר חדרים</label>
        <input type="number" name="numberOfRooms" value={familyData.numberOfRooms} onChange={handleInputChange} />

        <label>:קהילה</label>
        <input type="text" name="community" value={familyData.community} onChange={handleInputChange} />

        <label>:טלפון בעל</label>
        <input type="tel" name="husbandsPhone" value={familyData.husbandsPhone} onChange={handleInputChange} />

        <label>:טלפון אישה</label>
        <input type="tel" name="wifePhone" value={familyData.wifePhone} onChange={handleInputChange} />

        <label>:טלפון בבית</label>
        <input type="tel" name="homePhone" value={familyData.homePhone} onChange={handleInputChange} />

        <label>:דוא"ל</label>
        <input type="email" name="email" value={familyData.email} onChange={handleInputChange} />

        <label>:עיסוק הבעל</label>
        <select name="husbandOccupation" value={familyData.husbandOccupation} onChange={handleInputChange}>
          <option value="">בחר עיסוק אב</option>
          <option value="עובד">עובד</option>
          <option value="לומד">לומד</option>
          <option value="לומד חצי יום">לומד חצי יום</option>
        </select>

        <label>:מקום עבודה בעל</label>
        <input type="text" name="husbandOccupationPlace" value={familyData.husbandOccupationPlace} onChange={handleInputChange} />

        <label>:מקום עבודה אישה</label>
        <input type="text" name="wifeOccupationPlace" value={familyData.wifeOccupationPlace} onChange={handleInputChange} />

        <label>:ממליץ</label>
        <input type="text" name="recommender" value={familyData.recommender} onChange={handleInputChange} />

        <label>:טלפון ממליץ</label>
        <input type="tel" name="recommendersPhone" value={familyData.recommendersPhone} onChange={handleInputChange} />

        <label>:תיאור ובקשה</label>
        <textarea name="descriptionAndRequest" value={familyData.descriptionAndRequest} onChange={handleInputChange} />

        <label>:דרגה</label>
        <input type='text' name="familyLevel" value={familyData.familyLevel} onChange={handleInputChange} />
        <div>
          <button type="submit">הוסף משפחה</button>
        </div>
        {familyIndex && <>
          <AddBankForm familyIndex={familyIndex} />
          <AddChildForm familyIndex={familyIndex} />
          <AddExpenseForm familyIndex={familyIndex} />
          <AddIncomeForm familyIndex={familyIndex} />
          <AddDebtForm familyIndex={familyIndex} />
        </>
        }

      </form>
      <div className='saving-button'>
        <button onClick={() => { window.location.href = "/families" }}>שמירה</button>
      </div>
    </div>
  );
};

export default AddFamilyForm;
