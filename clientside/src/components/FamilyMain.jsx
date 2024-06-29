import React, { useState } from "react";
export default function FamilyMain() {
      
    const [searchTerm, setSearchTerm] = useState('');
    const [sortTerm, setSortTerm] = useState('');
    

    const handleSearchChange = (event) => {
        setSearchCriteria(event.target.value);
    };

    
    const handleSearch = () => {
        //fetch with searchCrieteria and term and set families with new params
    }

    

    return (
        <>
            <div>

                <h2>this supposes to display the details of a sepecific family using familyIndex, a new fetch request, how to display and is there anything else to do in this page? maybe editing what can be editedF</h2>
            </div>
            {/* {families.map((family, index) => ) } */}
        </>
    )
}