import React from 'react';
import ApartmentImage from './ApartmentImage';
import ApartmentInfo from './ApartmentInfo';

function ApartmentLayout({ tower, typology }) {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mt-8">
      <ApartmentImage tower={tower} typology={typology} />
      <ApartmentInfo tower={tower} typology={typology} />
    </div>
  );
}

export default ApartmentLayout;