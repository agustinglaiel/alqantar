import React from 'react';
import ApartmentImage from './ApartmentImage';
import ApartmentInfo from './ApartmentInfo';

function ApartmentLayout({ tower, typology }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-96 flex flex-col">
      <div className="flex-shrink-0">
        <ApartmentImage tower={tower} typology={typology} />
      </div>
      <div className="flex-1 flex flex-col">
        <ApartmentInfo tower={tower} typology={typology} />
      </div>
    </div>
  );
}

export default ApartmentLayout;