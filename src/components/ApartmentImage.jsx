// Cambios en src/components/ApartmentImage.jsx
import React from 'react';
import apartmentData from '../utils/apartmentData';

function ApartmentImage({ tower, typology }) {
  const data = apartmentData[tower]?.[typology] || {};
  const imageSrc = data.mainImage || '/images/default.webp';

  return (
    <div className="w-full h-48 sm:h-full rounded-t-lg overflow-hidden shadow-lg">
      <img
        src={imageSrc}
        alt={typology}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export default ApartmentImage;