// Cambios en src/components/ApartmentImage.jsx
import React from 'react';
import apartmentData from '../utils/apartmentData';

function ApartmentImage({ tower, typology }) {
  const data = apartmentData[tower]?.[typology] || {};
  const imageSrc = data.mainImage || '/images/default.jpg';

  return (
    <div className="w-full h-full rounded-t-lg overflow-hidden shadow-lg">
      <img
        src={imageSrc}
        alt={typology}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default ApartmentImage;