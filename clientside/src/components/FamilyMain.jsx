import React, { useState } from "react";
export default function FamilyMain() {
    const [searchCriteria, setSearchCriteria] = useState('none');
    const [sortCriteria, setSortCriteria] = useState('none');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortTerm, setSortTerm] = useState('');
    const [families, setFamilies] = useState([]);

    const handleSearchChange = (event) => {
        setSearchCriteria(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    const handleSearch = () => {
        //fetch with searchCrieteria and term and set families with new params
    }

    const handleSort = () => {
        switch (sortCriteria) {
          case 'numOfChildren':
            //GPT YOUR JOB!!!!!setFamilies(todosArr.slice().sort((a, b) => a.title.localeCompare(b.title))); // מיון לפי אלפבית
          case 'none':
            return families;
        }
      };

    return (
        <>
            <div>

                <select value={sortCriteria} onChange={handleSortChange}>
                    <option value="numOfChildren">מספר ילדים</option>
                    <option value="none">none</option>
                </select>
                <button onClick={handleSort}>מיין</button>


                <div>
                    <select value={searchCriteria} onChange={handleSearchChange}>
                        <option value="id">מספר זהות</option>
                        <option value="familyName">שם משפחה</option>{/*start with also*/}
                        <option value="fatherName">שם אב</option>{/*start with also*/}
                        <option value="motherName">שם אם</option>{/*start with also*/}
                        <option value="numOfChildren">מספר ילדים</option>
                        <option value="fatherOccupation">עיסוק אב</option>{/*רשימה נגללת של אברך . עובד . עובד חצי יום*/}
                        <option value="agesRangeOfChildren">ילדים בטווח גילאים </option>{/*פתיחת 2 תיבות מספר למנעד הגילאים הרצוי*/}
                        <option value="all">הצגת הכל</option>
                        <option value="none">נקה חיפוש</option>

                    </select>
                    <button onClick={handleSearch}>חיפוש</button>


                </div>

            </div>
            {families.map((family, index) => ) }
        </>
    )
}