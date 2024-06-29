import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function FamilyInList() {
    const navigate = useNavigate();
    const [families, setFamilies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('none');
    const [filterCriteria, setFilterCriteria] = useState('none'); 
    const [filterValue, setFilterValue] = useState(''); 
    const theadStyle = {
        border: "1px solid black",
        padding: "8px"
    };

    const fetchFamilies = (newOffset, append = false) => {
        setErrorMessage("");
        let url = `http://localhost:8080/member?_limit=${limit}&_offset=${newOffset}`;
        if (filterCriteria !== 'none' && filterValue) {
            url += `&${filterCriteria}=${filterValue}`;
        }
        fetch(url)
            .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("Failed to fetch data");
            })
            .then((result) => {
                console.log("Fetched data:", result);  // Debugging statement
                if (result.data) {
                    if (append) {
                        setFamilies(prevFamilies => [...prevFamilies, ...result.data]);
                    } else {
                        setFamilies(result.data);
                    }
                    setOffset(newOffset + limit);
                    if (result.data.length < limit) {
                        setHasMoreData(false); 
                    }
                } else {
                    throw new Error("No data field in response");
                }
            }).catch(error => {
                console.error("Error fetching data:", error);  
                setErrorMessage("No families found");
            });
    };

    useEffect(() => {
        fetchFamilies(0); 
    }, []);

    const handleLoadingMoreFamilies = () => {
        fetchFamilies(offset, true); 
    };

    const handleDisplayingFullDetails = (familyIndex) => {
        navigate(`/family/${familyIndex}`);
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    const handleSort = () => {
        switch (sortCriteria) {
            case 'numOfChildren':            
            case 'none':
                return families;
        }
    };

    const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
        setFilterValue('');
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
    };

    const handleFilter = () => {
        fetchFamilies(0); 
    }

    const renderFilterInput = () => {
        switch (filterCriteria) {
            case 'numOfChildren':
                return <input type="number" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס מספר ילדים" />;
            case 'agesRangeOfChildren':
                return (
                    <select value={filterValue} onChange={handleFilterValueChange}>
                        <option value="">בחר טווח גילאים</option>
                        <option value="0-5">ילדים מגיל 0-5</option>
                        <option value="5-10">ילדים מגיל 5-10</option>
                        <option value="10-15">ילדים מגיל 10-15</option>
                        <option value="15-20">ילדים מגיל 15-20</option>
                    </select>
                );
            default:
                return <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס ערך חיפוש" />;
        }
    };

    return (
        <>            
            <select value={sortCriteria} onChange={handleSortChange}>
                <option value="numOfChildren">מספר ילדים</option>
                <option value="none">none</option>
            </select>
            <button onClick={handleSort}>מיין</button>
            <div>
                <select value={filterCriteria} onChange={handleFilterChange}>
                    <option value="none">נקה חיפוש</option>
                    <option value="id">מספר זהות</option>
                    <option value="familyName">שם משפחה</option>
                    <option value="fatherName">שם אב</option>
                    <option value="motherName">שם אם</option>
                    <option value="numOfChildren">מספר ילדים</option>
                    <option value="fatherOccupation">עיסוק אב</option>
                    <option value="agesRangeOfChildren">ילדים בטווח גילאים</option>
                    <option value="all">הצגת הכל</option>
                </select>
                {renderFilterInput()}
                <button onClick={handleFilter}>חיפוש</button>
            </div>
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
                            <td style={theadStyle}>
                                לפרטים נוספים לחץ <a onClick={() => handleDisplayingFullDetails(family.familyIndex)}>כאן</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {errorMessage && <h4 style={{ textAlign: "center" }}>{errorMessage}</h4>}
            {hasMoreData && <button onClick={handleLoadingMoreFamilies}>טען עוד</button>}
        </>
    );
}
