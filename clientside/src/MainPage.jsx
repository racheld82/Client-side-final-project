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

const MainPage = ({ userRole }) => {
  const navigateToFamilies = () => {
    window.location.href = '/families';
  };

  const navigateToSupports = () => {
    window.location.href = '/supports';
  };

  const renderAdminFeatures = () => {
    if (userRole === 'manager') { // Adjust role based on your backend response
      return (
        <>
          <Link to="/registration">Register New User</Link>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>'קופת צדקה רמות א</h1>
      <button onClick={navigateToFamilies}>Families</button>
      <button onClick={navigateToSupports}>Supports</button>
    </div>
  );
};

export default MainPage;

