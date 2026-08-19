// Cambios en src/components/ApartmentImage.jsx
import React from 'react';
import apartmentData from '../utils/apartmentData';
import ProgressiveImage from './ProgressiveImage';

function ApartmentImage({ tower, typology }) {
  const data = apartmentData[tower]?.[typology] || {};
  const imageSrc = data.mainImage || '/images/default.webp';

  return (
    <div className="h-48 w-full overflow-hidden rounded-t-lg shadow-lg sm:h-full">
      <ProgressiveImage
        src={imageSrc}
        alt={typology}
        sizes="(min-width: 1024px) 400px, 92vw"
        className="size-full"
        imgClassName="transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default ApartmentImage;
