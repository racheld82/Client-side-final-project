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
    const [sortCriterion, setSortCriterion] = useState('none');
    const [filterCriterion, setFilterCriterion] = useState('none');
    const [filterValue, setFilterValue] = useState('');
    const [filterUrl, setFilterUrl] = useState(`http://localhost:8080/member?_limit=${limit}&_offset=${offset}`);
    const [currentSelectedFilter, setCurrentSelectedFilter] = useState('none');
    const [activeFilters, setActiveFilters] = useState([]);
    const theadStyle = {
        border: "1px solid black",
        padding: "8px"
    };
    const activeFilterStyle = {
        backgroundColor: 'blue',
        color: 'white'
    }
    const defaultFilterStyle = {
        backgroundColor: 'white',
        color: 'black'
    }

    const fetchFamilies = (newOffset, alternateUrl = "", append = false) => {
        setErrorMessage("");
        let url = "";
        if (alternateUrl) url = alternateUrl;
        else url = `http://localhost:8080/member?_limit=${limit}&_offset=${newOffset}`;
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
        setSortCriterion(event.target.value);
    };

    const handleSort = () => {
        switch (sortCriterion) {
            case 'numOfChildren':
            case 'none':
                return families;
        }
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
    };

    const handleDisplayInputFilter = (criterion, event) => {
        event.persist(); // Ensure event is persisted if needed
        setActiveFilters((prevFilters) => {
            let newFilters;
            if (prevFilters.includes(criterion)) {              
                newFilters = prevFilters.filter(activeFilter => activeFilter !== criterion);
                event.target.style.backgroundColor = defaultFilterStyle.backgroundColor; 
                event.target.style.color = defaultFilterStyle.color;
            } else {             
                newFilters = [...prevFilters, criterion];
                event.target.style.backgroundColor = activeFilterStyle.backgroundColor; 
                event.target.style.color = activeFilterStyle.color; 
            }
            return newFilters;
        });
        setCurrentSelectedFilter(criterion);
        setFilterValue('');
    };

    const handleFilterSubmit = () => {

    };

    const renderFilterInput = () => {
        if (!activeFilters.includes(currentSelectedFilter)) {
            return null; // Hide the input if the current filter is not active
        }

        switch (currentSelectedFilter) {
            case 'fatherId':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס מספר זהות אב" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'motherId':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס מספר זהות אם" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'familyName':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס שם משפחה" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'fatherName':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס שם אב" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'motherName':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס שם אם" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'numOfChildren':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס מספר ילדים" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'fatherOccupation':
                return (
                    <>
                        <select value={filterValue} onChange={handleFilterValueChange}>
                            <option value="">בחר עיסוק אב</option>
                            <option value="לומד">לומד</option>
                            <option value="לומד חצי יום">לומד חצי יום</option>
                            <option value="עובד">עובד</option>
                        </select>
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'agesRangeOfChildren':
                return (
                    <>
                        <select value={filterValue} onChange={handleFilterValueChange}>
                            <option value="">בחר טווח גילאים</option>
                            <option value="0-5">ילדים מגיל 0-5</option>
                            <option value="5-10">ילדים מגיל 5-10</option>
                            <option value="10-15">ילדים מגיל 10-15</option>
                            <option value="15-20">ילדים מגיל 15-20</option>
                        </select>
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <>
            <select value={sortCriterion} onChange={handleSortChange}>
                <option value="numOfChildren">מספר ילדים</option>
                <option value="none">none</option>
            </select>
            <button onClick={handleSort}>מיין</button>
            <div className='filter-div'>
                <p>:סנן לפי</p>
                <button id='none' onClick={(event) => handleDisplayInputFilter('none', event)}>נקה חיפוש</button>
                <button id='fatherId' onClick={(event) => handleDisplayInputFilter('fatherId', event)}>מספר זהות אב</button>
                <button id='motherId' onClick={(event) => handleDisplayInputFilter('motherId', event)}>מספר זהות אם</button>
                <button id='familyName' onClick={(event) => handleDisplayInputFilter('familyName', event)}>שם משפחה</button>
                <button id='fatherName' onClick={(event) => handleDisplayInputFilter('fatherName', event)}>שם אב</button>
                <button id='motherName' onClick={(event) => handleDisplayInputFilter('motherName', event)}>שם אם</button>
                <button id='numOfChildren' onClick={(event) => handleDisplayInputFilter('numOfChildren', event)}>מספר ילדים</button>
                <button id='fatherOccupation' onClick={(event) => handleDisplayInputFilter('fatherOccupation', event)}>עיסוק אב</button>
                <button id='agesRangeOfChildren' onClick={(event) => handleDisplayInputFilter('agesRangeOfChildren', event)}>ילדים בטווח גילאים</button>
                <button id='all' onClick={(event) => handleDisplayInputFilter('all')}></button>
                {renderFilterInput()}
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
