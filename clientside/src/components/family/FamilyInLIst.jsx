import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import FamilyDetails from './FamilyDetails'; 
import { utils as XLSXUtils, writeFile as writeExcelFile } from 'xlsx';
import AddFamilyForm from './AddFamilyForm';


export default function FamilyInList() {
    const navigate = useNavigate();
    const [families, setFamilies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [sortCriterion, setSortCriterion] = useState('none');
    const [filterValue, setFilterValue] = useState('');
    const [currentSelectedFilter, setCurrentSelectedFilter] = useState('none');
    const [activeFilters, setActiveFilters] = useState([]);
    const [latestFilterUrl, setLatestFilterUrl] = useState('');
    const [limitAndOffsetUrl] = useState(`_limit=${limit}&_offset=${offset}`);
    const [selectedFamily, setSelectedFamily] = useState(null); 

    const theadStyle = {
        border: "1px solid black",
        padding: "8px"
    };
    const activeFilterStyle = {
        backgroundColor: '#98b6d7',
        color: 'white'
    };
    const defaultFilterStyle = {
        backgroundColor: 'white',
        color: 'black'
    };

    const fetchFamilies = (newOffset, append = false, filterUrl = '') => {
        setErrorMessage("");
        let url = `http://localhost:8080/member`;        
        if (filterUrl.length > 0) {
            
            url += filterUrl + '&' + limitAndOffsetUrl;
            console.log("url with filters: ", url);
        } else {
            url += `?${limitAndOffsetUrl}`
        }

        fetch(url, {
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("Failed to fetch data");
            })
            .then((result) => {
                console.log("Fetched data:", result);  
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


    const handleLoadingMoreFamilies = () => {
        fetchFamilies(offset, true);
    };

    const handleDisplayingFullDetails = (familyIndex) => {        
       navigate(`/family/${familyIndex}`);
    };
   

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
    };

    const handleDisplayInputFilter = (criterion, event) => {
        setActiveFilters((prevFilters) => {
            let newFilters;
            if (prevFilters.includes(criterion)) {
                newFilters = prevFilters.filter(activeFilter => activeFilter !== criterion);
            } else {
                newFilters = [...prevFilters, criterion];
                setFilterValue('');
            }
            return newFilters;
        });
        setCurrentSelectedFilter(criterion);
    };

    const handleFilterSubmit = () => {
        console.log("currentSelectedFilter", currentSelectedFilter);
        console.log("active filters in filter submit: ", activeFilters)
        let filterUrl = ``;
        if (currentSelectedFilter !== 'all' && currentSelectedFilter !== 'none') {
            if(latestFilterUrl.includes('?')){
            filterUrl = latestFilterUrl + `&${currentSelectedFilter}=${filterValue}`;
            }
            else {
                filterUrl += latestFilterUrl + `?${currentSelectedFilter}=${filterValue}`;
            }
            setLatestFilterUrl(filterUrl);
        }
        console.log("in filter submit url: ", filterUrl)
        fetchFamilies(0, false, filterUrl);
    };

    const handleClearFilter = () => {
        setActiveFilters([]);
        setCurrentSelectedFilter('none');
        setFilterValue('');
        setLatestFilterUrl('');
        setFamilies([]);
        setErrorMessage("בחר מסנן");
    };

    const handleNoFilter = () => {
        setActiveFilters([]);
        setCurrentSelectedFilter('all');
        setLatestFilterUrl('');
        setFilterValue('');
        fetchFamilies(0, false);
    };

    const handleExportToExcel = () => {
        const data = families.map(family => ({
            'שם משפחה': family.familyName,
            'מספר זהות אב': family.husbandId,
            'מספר זהות אם': family.wifeId,
            'מספר ילדים': family.numberOfChildren,
            'עיסוק אב': family.husbandOccupation,
            'רחוב': family.street
        }));

        const worksheet = XLSXUtils.json_to_sheet(data);
        const workbook = XLSXUtils.book_new();
        XLSXUtils.book_append_sheet(workbook, worksheet, 'משפחות');
        const fileName = `families_${new Date().toISOString().slice(0, 10)}.xlsx`;


        // Save the Excel file
        writeExcelFile(workbook, fileName);
    };

    const renderFilterInput = () => {
        switch (currentSelectedFilter) {
            case 'husbandId':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס מספר זהות אב" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'wifeId':
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
            case 'husbandName':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס שם אב" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'wifeName':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס שם אם" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'numberOfChildren':
                return (
                    <>
                        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="הכנס מספר ילדים" />
                        <button onClick={handleFilterSubmit}>סנן</button>
                    </>
                );
            case 'husbandOccupation':
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
            default:
                return null;
        }
    };

    return (        <>
            <Link to={'add'}>הוסף משפחה</Link>
            <div className='filter-div'>
                <p>:סנן לפי</p>
                <button id='all' onClick={(event) => handleNoFilter()} style={activeFilters.includes('all') ? activeFilterStyle : defaultFilterStyle}>ללא סינון</button>
                <button id='none' onClick={handleClearFilter}>נקה חיפוש</button>
                <button id='husbandId' onClick={(event) => handleDisplayInputFilter('husbandId', event)} style={activeFilters.includes('husbandId') ? activeFilterStyle : defaultFilterStyle}>מספר זהות אב</button>
                <button id='wifeId' onClick={(event) => handleDisplayInputFilter('wifeId', event)} style={activeFilters.includes('wifeId') ? activeFilterStyle : defaultFilterStyle}>מספר זהות אם</button>
                <button id='familyName' onClick={(event) => handleDisplayInputFilter('familyName', event)} style={activeFilters.includes('familyName') ? activeFilterStyle : defaultFilterStyle}>שם משפחה</button>
                <button id='husbandName' onClick={(event) => handleDisplayInputFilter('husbandName', event)} style={activeFilters.includes('husbandName') ? activeFilterStyle : defaultFilterStyle}>שם אב</button>
                <button id='wifeName' onClick={(event) => handleDisplayInputFilter('wifeName', event)} style={activeFilters.includes('wifeName') ? activeFilterStyle : defaultFilterStyle}>שם אם</button>
                <button id='numberOfChildren' onClick={(event) => handleDisplayInputFilter('numberOfChildren', event)} style={activeFilters.includes('numberOfChildren') ? activeFilterStyle : defaultFilterStyle}>מספר ילדים</button>
                <button id='husbandOccupation' onClick={(event) => handleDisplayInputFilter('husbandOccupation', event)} style={activeFilters.includes('husbandOccupation') ? activeFilterStyle : defaultFilterStyle}>עיסוק אב</button>
                {renderFilterInput()}
            </div>
            <table style={{ borderCollapse: "collapse", width: "100%", direction: "rtl" }}>
                <thead>
                    <tr style={{ backgroundColor: "#ccd" }}>
                        <th style={theadStyle}>שם משפחה</th>
                        <th style={theadStyle}>מספר זהות אב</th>
                        <th style={theadStyle}>מספר זהות אם</th>
                        <th style={theadStyle}>מספר ילדים</th>
                        <th style={theadStyle}>עיסוק אב</th>
                        <th style={theadStyle}>רחוב</th>
                        <th style={theadStyle}>פרטים מלאים</th>
                    </tr>
                </thead>
                <tbody>
                    {families.map((family, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#eee" }}>
                            <td style={theadStyle}>{family.familyName}</td>
                            <td style={theadStyle}>{family.husbandId}</td>
                            <td style={theadStyle}>{family.wifeId}</td>
                            <td style={theadStyle}>{family.numberOfChildren}</td>
                            <td style={theadStyle}>{family.husbandOccupation}</td>
                            <td style={theadStyle}>{family.street}</td>
                            <td style={theadStyle}><button onClick={() => handleDisplayingFullDetails(family.familyIndex)}>לפרטים מלאים</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMoreData && (
                <button onClick={handleLoadingMoreFamilies}>Load More Families</button>
            )}
            {errorMessage && <p>{errorMessage}</p>}   
            <button onClick={handleExportToExcel}>ייצא ל-EXCEL</button>
         
        </>
    );
}

