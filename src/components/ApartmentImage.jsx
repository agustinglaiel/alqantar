import React from 'react';

function ApartmentImage({ tower, typology }) {
  const imageSrc = {
    'torre1': {
      'Departamento A': '/images/01.png',
      'Departamento B/D/E': '/images/02.png',
      'Departamento C/F': '/images/03.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
    'torre2': {
      'Departamento A/B': '/images/04.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
    'torre3': {
      'Departamento A': '/images/05.png',
      'Departamento B': '/images/06.png',
      'Departamento C': '/images/07.png',
      'Terraza/Quincho': '/images/01.png',
      'Subsuelo': '/images/01.png',
    },
    'amenities': {
      'Piscina': '/images/08.png',
      'Gimnasio': '/images/09.png',
      'Sauna': '/images/10.png',
      'SPA': '/images/10.png',
    },
  }[tower]?.[typology] || '/images/default.jpg';

  return (
    <div className="w-full md:w-1/2 h-96 rounded-l-lg overflow-hidden shadow-lg perspective-1000">
      <div className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-105" style={{ backgroundImage: `url(${imageSrc})` }} />
    </div>
  );
}

export default ApartmentImage;