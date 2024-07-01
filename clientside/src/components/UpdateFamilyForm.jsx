import React, { useState, useEffect } from 'react';

const UpdateFamilyForm = ({ familyIndex }) => {
  const [familyData, setFamilyData] = useState({});

  useEffect(() => {
    // טעינת נתוני המשפחה הקיימים לעריכה
    fetch(`http://localhost:8080/member?familyIndex=${familyIndex}`)
      .then(response => response.json())
      .then(data => setFamilyData(data));
  }, [familyIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFamilyData({ ...familyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/member?familyIndex=${familyIndex}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(familyData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Family updated:', data);
        // אפשר להוסיף פה ניווט או פעולות נוספות לאחר העדכון
      })
      .catch(error => {
        console.error('Error updating family:', error);
        // טיפול בשגיאות
      });
  };

  return (
    <div>
      <h2>עדכון פרטי משפחה</h2>
      <form onSubmit={handleSubmit}>
        <label>שם משפחה:</label>
        <input type="text" name="familyName" value={familyData.familyName} onChange={handleInputChange} required />

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

        <label>מקצוע בעל:</label>
        <input type="text" name="husbandOccupation" value={familyData.husbandOccupation} onChange={handleInputChange} />

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

        <button type="submit">עדכן פרטים</button>
      </form>
    </div>
  );
};

export default UpdateFamilyForm;
