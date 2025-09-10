import React from 'react';

function ApartmentImage({ tower, typology }) {
  const imageSrc = {
    'torre1': {
      'Tipología 1': '/images/01.png',
      'Tipología 2': '/images/02.png',
      'Tipología 3': '/images/03.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
    'torre2': {
      'Tipología 1': '/images/04.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
  }[tower]?.[typology] || '/images/default.jpg';

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