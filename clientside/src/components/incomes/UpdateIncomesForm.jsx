import React, { useState, useEffect } from 'react';

const UpdateIncomesForm = ({ familyIndex, onClose }) => {
    const [incomesData, setIncomesData] = useState({});
    const YEAR = 2024;
    useEffect(() => {
        fetch(`http://localhost:8080/incomes?familyIndex=${familyIndex}&year=${YEAR}`)
            .then((response) => response.json())
            .then((result) => setIncomesData(result.data[0]));
    }, [familyIndex]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIncomesData({ ...incomesData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedIncomes = calculateTotalIncomes();
        console.log("after calculating: ", updatedIncomes);
        fetch(`http://localhost:8080/incomes/${familyIndex}?year=${YEAR}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedIncomes),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Incomes updated:', data);                
            })
            .catch(error => {
                console.error('Error updating incomes:', error);               
            });
        onClose();
    };

    const calculateTotalIncomes = () => {        
        const { familyIndex, additionalIncomesDescription, totalIncomes, ...incomes } = incomesData;
        const total = Object.values(incomes).reduce((acc, value) => acc + Number(value), 0);
        return {
            ...incomesData,
            totalIncomes: total
        };
    }


    return (
        <div>
            <h2>עדכון פרטי הכנסות</h2>
            <form onSubmit={handleSubmit} className='edit-form'>
                <label>:הכנסות בעל</label>
                <input type="number" name="husbandIncomesSum" defaultValue={incomesData.husbandIncomesSum} onChange={handleInputChange} required />

                <label>:הכנסות אישה</label>
                <input type="number" name="wifeIncomesSum" value={incomesData.wifeIncomesSum} onChange={handleInputChange} />

                <label>תיאור הכנסות נוספות</label>
                <input type="text" name="additionalIncomesDescription" value={incomesData.additionalIncomesDescription} onChange={handleInputChange} />

                <label>:סכום הכנסות נוספות</label>
                <input type="number" name="additionalIncomesSum" value={incomesData.additionalIncomesSum} onChange={handleInputChange} />

                <label>:קצבאות ילדים</label>
                <input type="number" name="childAllowance" value={incomesData.childAllowance} onChange={handleInputChange} />

                <label>:קצבת הבטחת הכנסה</label>
                <input type="number" name="guaranteedIncome" value={incomesData.guaranteedIncome} onChange={handleInputChange} />

                <label>:קצבת נכות</label>
                <input type="number" name="disabilityFund" value={incomesData.disabilityFund} onChange={handleInputChange} />

                <label>:סיוע בשכר דירה</label>
                <input type="number" name="rentAssitance" value={incomesData.rentAssitance} onChange={handleInputChange} />

                <label>:מזונות</label>
                <input type="number" name="alimony" value={incomesData.alimony} onChange={handleInputChange} />

                <label>:תמיכה ממשפחה</label>
                <input type="number" name="familySupport" value={incomesData.familySupport} onChange={handleInputChange} />

                <label>:תרומות</label>
                <input type="number" name="charitySupport" value={incomesData.charitySupport} onChange={handleInputChange} />

                <label>:הכנסות מנכסים</label>
                <input type="number" name="propertyIncomes" value={incomesData.propertyIncomes} onChange={handleInputChange} />

                {/* add rest of necessary inputs!!!!!!!!! */}

                <button type="submit">עדכן פרטים</button>
                <button onClick={() => { onClose(); }}>ביטול</button>
            </form>
        </div>
    );
};

export default UpdateIncomesForm;



