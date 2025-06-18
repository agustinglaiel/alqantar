import React from 'react';
import ApartmentImage from './ApartmentImage';
import ApartmentInfo from './ApartmentInfo';

function ApartmentLayout({ tower, typology }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ApartmentImage tower={tower} typology={typology} />
      <ApartmentInfo tower={tower} typology={typology} />
    </div>
  );
}

export default ApartmentLayout;