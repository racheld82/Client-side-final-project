import React from 'react';

const MainPage = () => {

  const navigateToFamilies = () => {
    window.location.href = '/families';
  };

  const navigateToSupports = () => {
    window.location.href = '/supports';
};

  return (
    <div>
      <h1>קופת צדקה רמות א'</h1>
      <button onClick={navigateToFamilies}>Families</button>
      <button onClick={navigateToSupports}>Supports</button>
    </div>
  );
};

export default MainPage;
