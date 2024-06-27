import { useEffect, useState } from 'react'
import React from 'react';
import { useNavigate } from "react-router-dom";
// import { useRef } from 'react'
// import {
//     Link,
//   useNavigate
// } from "react-router-dom";

export default function FamilyInList() {
   
    const navigate = useNavigate();
    const theadStyle = {
        "border": "1px solid black",
        "padding": "8px"
    }

    const handleLodingMoreFamilies = () => {
        //בפונקציה זו בעצם מבצעים בקשת fetch
        //חדשה, כשהפעם במקום להכניס מידע על חשבון המערך הקיים מוסיפים מידע למערך הקיים, משהו כמו 
        //setFamilies(prevData => [...prevData, newData])
    }

    const handleAddingFilter = () => {
        //כאן מבצעים בקשת fetch
        //בהתאם לכפתור שנלחץ (כרגע אנחנו נותנות את האופציות לסינון, טיפול בערך כמו בלינקדאין,
        // כל פעם שלוחצים על תווית מוסיפים סינון וכל פעם שלוחצים עליה שוב הוא יורד)
        //למה בעצם נתנו את כל האופציות של הסינון בעמוד familyMain?
        //לכאורה זה צריך להיות כאן, איפה שאפשר לסנן מתוך הרבה משפחות רק משפחות שעונות על תנאים מסויימים
        //יכול להיות שצריך גם כפתור שמציע להוריד את כל הסינונים בבת אחת, חוזרים למסך ריק
    }

    const handleDisplayingFullDetails = (familyIndex) => {
        navigate(`/family/${familyIndex}`);
    }
    const families = [
        { familyIndex: 1, familyName: "כהן", husbandId: 789, wifeId: 963, husbandsOccupation: "לומד", numberOfChildren: 7, street: "דרוק" },
        { familyIndex: 2, familyName: "לוי", husbandId: 123, wifeId: 852, husbandsOccupation: "עובד חצי יום", numberOfChildren: 6, street: "אגרות משה" },
        // Add more family objects here
    ];

    return (
        <>
            <table style={{ borderCollapse: "collapse", width: "100%", direction: "rtl" }}>
                <thead>
                    <tr style={{ backgroundColor: "#ccd" }}>
                        <th style={theadStyle}>שם משפחה</th>
                        <th style={theadStyle}>ת.ז. אב</th>
                        <th style={theadStyle}>ת.ז. אם</th>
                        <th style={theadStyle}>מספר ילדים</th>
                        <th style={theadStyle}>עיסוק האב</th>
                        <th style={theadStyle}>רחוב</th>
                        <th style={theadStyle}>לפרטים מלאים</th>
                    </tr>
                </thead>
                <tbody>
                    {families.map((family, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ccc" : "#fff" }}>
                            <td style={theadStyle}>{family.familyName}</td>
                            <td style={theadStyle}>{family.husbandId}</td>
                            <td style={theadStyle}>{family.wifeId}</td>
                            <td style={theadStyle}>{family.numberOfChildren}</td>
                            <td style={theadStyle}>{family.husbandsOccupation}</td>
                            <td style={theadStyle}>{family.street}</td>
                            <td style={theadStyle}>לפרטים נוספים לחץ <a onClick={() => handleDisplayingFullDetails(family.familyIndex)}>כאן</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLodingMoreFamilies}>טען עוד</button>
        </>
    );
}

