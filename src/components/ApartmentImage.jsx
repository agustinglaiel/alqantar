import React from 'react';

function ApartmentImage({ tower, typology }) {
  const imageSrc = {
    'torre1': {
      'Tipología A': '/images/01.png',
      'Tipología B/D/E': '/images/02.png',
      'Tipología C/F': '/images/03.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
    'torre2': {
      'Tipología A/B': '/images/04.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
    // 'torre3': {
    //   'Tipología A': '/images/05.png',
    //   'Tipología B': '/images/06.png',
    //   'Tipología C': '/images/07.png',
    //   'Terraza/Quincho': '/images/01.png',
    //   'Subsuelo': '/images/01.png',
    // },
    // 'amenities': {
    //   'Piscina': '/images/08.png',
    //   'Gimnasio': '/images/09.png',
    //   'Sauna': '/images/10.png',
    //   'SPA': '/images/10.png',
    // },
  }[tower]?.[typology] || '/images/default.jpg';

  return (
    <div className="w-full h-48 rounded-t-lg overflow-hidden shadow-lg">
      <img 
        src={imageSrc} 
        alt={typology}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default ApartmentImage;