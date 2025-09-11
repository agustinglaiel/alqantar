import React from 'react';
import ImageCarousel from './ImageCarousel';
import apartmentData from '../utils/apartmentData';

function ApartmentDetailModal({ isOpen, onClose, tower, typology }) {
  const data = apartmentData[tower]?.[typology] || {
    images: [{ src: '/images/default.jpg', alt: 'Imagen por defecto' }],
    description: 'Información no disponible.',
    size: 'N/A',
    features: [],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Sección del carrusel - arriba en móvil, izquierda en desktop */}
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full p-4 lg:p-6">
          <ImageCarousel images={data.images} />
        </div>
        
        {/* Sección de información - abajo en móvil, derecha en desktop */}
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full p-4 lg:p-6 bg-gray-50 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Sección de tipología y descripción */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{typology}</h2>
              <p className="text-gray-900 text-base md:text-md text-justify leading-relaxed">{data.description}</p>
            </div>

            {/* Sección de características */}
            <div className="mb-4">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3">Características:</h3>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {data.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <feature.icon className="text-blue-500" size={18} />
                    <span className="text-gray-700 text-sm lg:text-base">{feature.value} {feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm lg:text-base mt-4"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApartmentDetailModal;