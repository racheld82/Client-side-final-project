import React, { useState, useEffect } from 'react';

const UpdateFamilyForm = ({ familyIndex, onClose, setParentFamilyDetails }) => {
  const [familyData, setFamilyData] = useState({});

  useEffect(() => {

    fetch(`http://localhost:8080/member?familyIndex=${familyIndex}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => { setFamilyData(result.data[0]) });
  }, [familyIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFamilyData({ ...familyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFamilyData = fixFormatOfDob();
    fetch(`http://localhost:8080/member/${familyIndex}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedFamilyData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Family updated:', data);
        setParentFamilyDetails(formattedFamilyData)
      })
      .catch(error => {
        console.error('Error updating family:', error);
      });
    onClose();
  };

  const fixFormatOfDob = () => {
    const newHusbandDob = familyData.husbandDob.slice(0, familyData.husbandDob.indexOf('T'));
    const newWifeDob = familyData.wifeDob.slice(0, familyData.wifeDob.indexOf('T'));
    return { ...familyData, husbandDob: newHusbandDob, wifeDob: newWifeDob }
  }


  return (
    <div>
      <h2>עדכון פרטי משפחה</h2>
      <form onSubmit={handleSubmit} className='edit-form'>
        <label>שם משפחה:</label>
        <input type="text" name="familyName" defaultValue={familyData.familyName} onChange={handleInputChange} required />

        <label>שם בעל:</label>
        <input type="text" name="husbandName" value={familyData.husbandName} onChange={handleInputChange} />

        <label>שם אישה:</label>
        <input type="text" name="wifeName" value={familyData.wifeName} onChange={handleInputChange} />

        <label>תעודת זהות בעל:</label>
        <input type="text" name="husbandId" value={familyData.husbandId} onChange={handleInputChange} />

        <label>תעודת זהות אישה:</label>
        <input type="text" name="wifeId" value={familyData.wifeId} onChange={handleInputChange} />

        <label>תאריך לידה בעל:</label>
        <input type="date" name="husbandDob" value={familyData.husbandDob} onChange={handleInputChange} />

        <label>תאריך לידה אישה:</label>
        <input type="date" name="wifeDob" value={familyData.wifeDob} onChange={handleInputChange} />

        <label>מצב משפחתי:</label>
        <input type="text" name="familyStatus" value={familyData.familyStatus} onChange={handleInputChange} />

        <label>מספר ילדים:</label>
        <input type="number" name="numberOfChildren" value={familyData.numberOfChildren} onChange={handleInputChange} />

        <label>מספר ילדים נשואים:</label>
        <input type="number" name="numberOfMarriedChildren" value={familyData.numberOfMarriedChildren} onChange={handleInputChange} />

        <label>רחוב:</label>
        <input type="text" name="street" value={familyData.street} onChange={handleInputChange} />

        <label>כניסה:</label>
        <input type="text" name="entrance" value={familyData.entrance} onChange={handleInputChange} />

        <label>קומה:</label>
        <input type="number" name="floor" value={familyData.floor} onChange={handleInputChange} />

        <label>מספר דירה:</label>
        <input type="number" name="appartmentNumber" value={familyData.appartmentNumber} onChange={handleInputChange} />

        <label>מספר חדרים:</label>
        <input type="number" name="numberOfRooms" value={familyData.numberOfRooms} onChange={handleInputChange} />

        <label>קהילה:</label>
        <input type="text" name="community" value={familyData.community} onChange={handleInputChange} />

        <label>טלפון בעל:</label>
        <input type="tel" name="husbandsPhone" value={familyData.husbandsPhone} onChange={handleInputChange} />

        <label>טלפון אישה:</label>
        <input type="tel" name="wifePhone" value={familyData.wifePhone} onChange={handleInputChange} />

        <label>טלפון בבית:</label>
        <input type="tel" name="homePhone" value={familyData.homePhone} onChange={handleInputChange} />

        <label>דוא"ל:</label>
        <input type="email" name="email" value={familyData.email} onChange={handleInputChange} />

        <label>עיסוק הבעל:</label>
        <select name="husbandOccupation" value={familyData.husbandOccupation} onChange={handleInputChange}>
          <option value="">בחר עיסוק אב</option>
          <option value="עובד">עובד</option>
          <option value="לומד">לומד</option>
          <option value="לומד חצי יום">לומד חצי יום</option>
        </select>

        <label>מקום עבודה בעל:</label>
        <input type="text" name="husbandOccupationPlace" value={familyData.husbandOccupationPlace} onChange={handleInputChange} />

        <label>מקום עבודה אישה:</label>
        <input type="text" name="wifeOccupationPlace" value={familyData.wifeOccupationPlace} onChange={handleInputChange} />

        <label>ממליץ:</label>
        <input type="text" name="recommender" value={familyData.recommender} onChange={handleInputChange} />

        <label>טלפון ממליץ:</label>
        <input type="tel" name="recommendersPhone" value={familyData.recommendersPhone} onChange={handleInputChange} />

        <label>תיאור ובקשה:</label>
        <textarea name="descriptionAndRequest" value={familyData.descriptionAndRequest} onChange={handleInputChange} />

        <label>דרגה:</label>
        <textarea name="familyLevel" value={familyData.familyLevel} onChange={handleInputChange} />


        <button type="submit">עדכן פרטים</button>
        <button onClick={() => { onClose(); }}>ביטול</button>
      </form>
    </div>
  );
};

export default UpdateFamilyForm;

