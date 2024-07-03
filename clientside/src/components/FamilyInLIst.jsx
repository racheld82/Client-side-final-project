import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import FamilyDetails from './FamilyDetails'; // Import the FamilyDetails component

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
    const [selectedFamily, setSelectedFamily] = useState(null); // State to hold the selected family

    const theadStyle = {
        border: "1px solid black",
        padding: "8px"
    };
    const activeFilterStyle = {
        backgroundColor: 'blue',
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
            // activeFilters.forEach(filter => {
            //     if (filter !== 'none' && filterValue) {
            //         if (url.includes('?')) {
            //             url += `&${filter}=${filterValue}`;
            //         } else {
            //             url += `?${filter}=${filterValue}`;
            //         }
            //     }
            // });
            url += filterUrl + '&' + limitAndOffsetUrl;
            console.log("url with filters: ", url);
        } else {
            url += `?${limitAndOffsetUrl}`
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


    const handleLoadingMoreFamilies = () => {
        fetchFamilies(offset, true);
    };

    const handleDisplayingFullDetails = (familyIndex) => {        
       navigate(`/family/${familyIndex}`);
    };

    const handleCloseDetails = () => {
        setSelectedFamily(null); // Close the family details view
    };

    const handleSortChange = (event) => {
        setSortCriterion(event.target.value);
    };

    const handleSort = () => {
        switch (sortCriterion) {
            case 'numberOfChildren':
            case 'none':
                return families;
        }
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

    return (
        <>
            <select value={sortCriterion} onChange={handleSortChange}>
                <option value="numberOfChildren">מספר ילדים</option>
                <option value="none">none</option>
            </select>
            <button onClick={handleSort}>מיין</button>
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
        </>
    );
}


// import { useEffect, useState } from 'react';
// import React from 'react';
// import { useNavigate } from "react-router-dom";
// import FamilyDetails from './FamilyDetails'; // Import the FamilyDetails component

// export default function FamilyInList() {
//     const navigate = useNavigate();
//     const [families, setFamilies] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [limit] = useState(20);
//     const [offset, setOffset] = useState(0);
//     const [hasMoreData, setHasMoreData] = useState(true);
//     const [sortCriterion, setSortCriterion] = useState('none');
//     const [filterValue, setFilterValue] = useState('');
//     const [currentSelectedFilter, setCurrentSelectedFilter] = useState('none');
//     const [activeFilters, setActiveFilters] = useState([]);
//     const [selectedFamily, setSelectedFamily] = useState(null); // State to hold the selected family

//     const theadStyle = {
//         border: "1px solid black",
//         padding: "8px"
//     };
//     const activeFilterStyle = {
//         backgroundColor: 'blue',
//         color: 'white'
//     };
//     const defaultFilterStyle = {
//         backgroundColor: 'white',
//         color: 'black'
//     };

//     const fetchFamilies = (newOffset, append = false) => {
//         setErrorMessage("");
//         let url = `http://localhost:8080/member?_limit=${limit}&_offset=${newOffset}`;
//         console.log("activeFilters: ", activeFilters);

//         activeFilters.forEach(({ filter, filterValue }) => {
//             if (filter !== 'none' && filterValue) {
//                 if (url.includes('?')) {
//                     url += `&${filter}=${filterValue}`;
//                 } else {
//                     url += `?${filter}=${filterValue}`
//                 }
//             }
//         });
//         console.log("url with filters: ", url);

//         fetch(url)
//             .then((response) => {
//                 if (response.ok) return response.json();
//                 else throw new Error("Failed to fetch data");
//             })
//             .then((result) => {
//                 console.log("Fetched data:", result);  // Debugging statement
//                 if (result.data) {
//                     if (append) {
//                         setFamilies(prevFamilies => [...prevFamilies, ...result.data]);
//                     } else {
//                         setFamilies(result.data);
//                     }
//                     setOffset(newOffset + limit);
//                     if (result.data.length < limit) {
//                         setHasMoreData(false);
//                     }
//                 } else {
//                     throw new Error("No data field in response");
//                 }
//             }).catch(error => {
//                 console.error("Error fetching data:", error);
//                 setErrorMessage("No families found");
//             });
//     };

//     const handleLoadingMoreFamilies = () => {
//         fetchFamilies(offset, true);
//     };

//     const handleDisplayingFullDetails = (family) => {
//         setSelectedFamily(family); // Set the selected family to display details
//     };

//     const handleCloseDetails = () => {
//         setSelectedFamily(null); // Close the family details view
//     };

//     const handleSortChange = (event) => {
//         setSortCriterion(event.target.value);
//     };

//     const handleSort = () => {
//         switch (sortCriterion) {
//             case 'numberOfChildren':
//             case 'none':
//                 return families;
//         }
//     };

//     const handleFilterValueChange = (event) => {
//         setFilterValue(event.target.value);
//     };

//     const handleDisplayInputFilter = (criterion, event) => {
//         setCurrentSelectedFilter(criterion);
//         setFilterValue('');
//     };

//     const handleFilterSubmit = () => {
//         setActiveFilters((prevFilters) => {
//             const newFilter = { filter: currentSelectedFilter, filterValue: filterValue };
//             const existingFilterIndex = prevFilters.findIndex(f => f.filter === currentSelectedFilter);
//             let newFilters;
//             if (existingFilterIndex > -1) {
//                 newFilters = [...prevFilters];
//                 newFilters[existingFilterIndex] = newFilter;
//             } else {
//                 newFilters = [...prevFilters, newFilter];
//             }
//             return newFilters;
//         });
//         fetchFamilies(0);
//     };

//     const handleClearFilter = () => {
//         setActiveFilters([]);
//         setCurrentSelectedFilter('none');
//         setFilterValue('');
//         setFamilies([]);
//         setErrorMessage("No families found");
//     };

//     const handleNoFilter = () => {
//         setActiveFilters([]);
//         setCurrentSelectedFilter('all');
//         setFilterValue('');
//         fetchFamilies(0, false);
//     };

//     const renderFilterInput = () => {
//         switch (currentSelectedFilter) {
//             case 'husbandId':
//             case 'wifeId':
//             case 'familyName':
//             case 'husbandName':
//             case 'wifeName':
//             case 'numberOfChildren':
//                 return (
//                     <>
//                         <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder={`הכנס ${currentSelectedFilter}`} />
//                         <button onClick={handleFilterSubmit}>סנן</button>
//                     </>
//                 );
//             case 'husbandOccupation':
//                 return (
//                     <>
//                         <select value={filterValue} onChange={handleFilterValueChange}>
//                             <option value="">בחר עיסוק אב</option>
//                             <option value="לומד">לומד</option>
//                             <option value="לומד חצי יום">לומד חצי יום</option>
//                             <option value="עובד">עובד</option>
//                         </select>
//                         <button onClick={handleFilterSubmit}>סנן</button>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <>
//             <select value={sortCriterion} onChange={handleSortChange}>
//                 <option value="numberOfChildren">מספר ילדים</option>
//                 <option value="none">none</option>
//             </select>
//             <button onClick={handleSort}>מיין</button>
//             <div className='filter-div'>
//                 <p>:סנן לפי</p>
//                 <button id='all' onClick={(event) => handleNoFilter()} style={activeFilters.find(f => f.filter === 'all') ? activeFilterStyle : defaultFilterStyle}>ללא סינון</button>
//                 <button id='none' onClick={handleClearFilter}>נקה חיפוש</button>
//                 <button id='husbandId' onClick={(event) => handleDisplayInputFilter('husbandId', event)} style={activeFilters.find(f => f.filter === 'husbandId') ? activeFilterStyle : defaultFilterStyle}>מספר זהות אב</button>
//                 <button id='wifeId' onClick={(event) => handleDisplayInputFilter('wifeId', event)} style={activeFilters.find(f => f.filter === 'wifeId') ? activeFilterStyle : defaultFilterStyle}>מספר זהות אם</button>
//                 <button id='familyName' onClick={(event) => handleDisplayInputFilter('familyName', event)} style={activeFilters.find(f => f.filter === 'familyName') ? activeFilterStyle : defaultFilterStyle}>שם משפחה</button>
//                 <button id='husbandName' onClick={(event) => handleDisplayInputFilter('husbandName', event)} style={activeFilters.find(f => f.filter === 'husbandName') ? activeFilterStyle : defaultFilterStyle}>שם אב</button>
//                 <button id='wifeName' onClick={(event) => handleDisplayInputFilter('wifeName', event)} style={activeFilters.find(f => f.filter === 'wifeName') ? activeFilterStyle : defaultFilterStyle}>שם אם</button>
//                 <button id='numberOfChildren' onClick={(event) => handleDisplayInputFilter('numberOfChildren', event)} style={activeFilters.find(f => f.filter === 'numberOfChildren') ? activeFilterStyle : defaultFilterStyle}>מספר ילדים</button>
//                 <button id='husbandOccupation' onClick={(event) => handleDisplayInputFilter('husbandOccupation', event)} style={activeFilters.find(f => f.filter === 'husbandOccupation') ? activeFilterStyle : defaultFilterStyle}>עיסוק אב</button>
//                 {renderFilterInput()}
//             </div>
//             <table style={{ borderCollapse: "collapse", width: "100%", direction: "rtl" }}>
//                 <thead>
//                     <tr style={{ backgroundColor: "#ccd" }}>
//                         <th style={theadStyle}>שם משפחה</th>
//                         <th style={theadStyle}>מספר זהות אב</th>
//                         <th style={theadStyle}>מספר זהות אם</th>
//                         <th style={theadStyle}>מספר ילדים</th>
//                         <th style={theadStyle}>עיסוק אב</th>
//                         <th style={theadStyle}>רחוב</th>
//                         <th style={theadStyle}>פרטים מלאים</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {families.map((family, index) => (
//                         <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#eee" : "#fff" }}>
//                             <td style={theadStyle}>{family.familyName}</td>
//                             <td style={theadStyle}>{family.husbandId}</td>
//                             <td style={theadStyle}>{family.wifeId}</td>
//                             <td style={theadStyle}>{family.numberOfChildren}</td>
//                             <td style={theadStyle}>{family.husbandOccupation}</td>
//                             <td style={theadStyle}>{family.street}</td>
//                             <td style={theadStyle}>
//                                 <button onClick={() => handleDisplayingFullDetails(family)}>הצג</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {hasMoreData && <button onClick={handleLoadingMoreFamilies}>טען עוד</button>}
//             {errorMessage && <div>{errorMessage}</div>}
//             {selectedFamily && <FamilyDetails family={selectedFamily} onClose={handleCloseDetails} />} {/* Conditionally render FamilyDetails */}
//         </>
//     );
// }
