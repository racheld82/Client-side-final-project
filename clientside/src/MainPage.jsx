// import React from 'react';

// const MainPage = () => {

//   const navigateToFamilies = () => {
//     window.location.href = '/families';
//   };

//   const navigateToSupports = () => {
//     window.location.href = '/supports';
// };

//   return (
//     <div>
//       <h1>קופת צדקה רמות א'</h1>
//       <button onClick={navigateToFamilies}>Families</button>
//       <button onClick={navigateToSupports}>Supports</button>
//     </div>
//   );
// };

// export default MainPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const MainPage = () => {

  const location = useLocation();
  const role = location.state?.role;
  console.log(role)

  const navigateToFamilies = () => {
    window.location.href = '/families';
  };

  const navigateToSupports = () => {
    window.location.href = '/supports';
  };

  const renderAdminFeatures = () => {
    if (role === 'מנהל') { 
      return (
        <>
          <Link to="/registration">רשום משתמש חדש</Link>
        </>
      );
    }
    return null;
  };

  return (
    <>
    <div>
      <h1>'קופת צדקה רמות א</h1>
      <button onClick={navigateToFamilies}>משפחות</button>
      <button onClick={navigateToSupports}>קרנות</button>
    </div>
    {renderAdminFeatures()}
    </>
  );
};

export default MainPage;

