import React from 'react';

function AmenitieLayout({ amenityType, onCustomClick }) {
  // Configuración para cada tipo de amenity
  const amenityConfig = {
    'sum': {
      title: 'SUM Privado',
      description: 'Salones amplios y equipados',
      image: '/images/amenities/15.png'
    },
    'spa': {
      title: 'Gimnasio & Spa & Relax',
      description: 'Gimnasio, Sauna y Sala de relax',
      image: '/images/amenities/03.png'
    }
  };

  const config = amenityConfig[amenityType] || amenityConfig['sum'];

  const handleClick = () => {
    if (onCustomClick) {
      onCustomClick(amenityType);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden min-h-96 flex flex-col">
      {/* Sección superior: Imagen (70% del espacio) */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={config.image}
          alt={config.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sección media: Título y descripción (20% del espacio) */}
      <div className="flex-1 flex flex-col justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {config.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {config.description}
        </p>
      </div>

      {/* Sección inferior: Botón (10% del espacio) */}
      <div className="p-4 pt-0">
        <button
          onClick={handleClick}
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Vistas 360°
        </button>
      </div>
    </div>
  );
}

export default AmenitieLayout;