import { useEffect, useState } from 'react'
import React from 'react';
// import { useRef } from 'react'
// import {
//     Link,
//   useNavigate
// } from "react-router-dom";

export default function FamilyInList() {
    // return (
    //     <>
    //     <h3>This should contain a table of family in list entities</h3>
    //     </>
    // )
    const theadStyle = {
        "border": "1px solid black",
        "padding": "8px"
    }
    const families = [
        { familyName: "כהן", husbandId: 789, wifeId: 963, husbandsOccupation: "לומד", numberOfChildren: 7, street: "דרוק" },
        { familyName: "לוי", husbandId: 123, wifeId: 852, husbandsOccupation: "עובד חצי יום", numberOfChildren: 6, street: "אגרות משה" },
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

