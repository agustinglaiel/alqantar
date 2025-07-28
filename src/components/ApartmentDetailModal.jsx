import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Wifi, Bath, Bed } from 'lucide-react';

function ApartmentDetailModal({ isOpen, onClose, tower, typology }) {
  // Datos de imágenes y detalles (extendiendo los datos de ApartmentImage y ApartmentInfo)
  const apartmentData = {
    torre1: {
      'Tipología A': {
        images: [
          { src: '/images/01.png', alt: 'Tipología A - Vista 1' },
          { src: '/images/02.png', alt: 'Tipología A - Vista 2' },
          { src: '/images/03.png', alt: 'Tipología A - Vista 3' },
        ],
        description: 'Apartamento en Torre 1 de 2 dormitorios con 2 baños.',
        size: '273,78 m²',
        features: ['Wifi', '2 Baños', '2 Camas'],
      },
      'Tipología B/D/E': {
        images: [
          { src: '/images/02.png', alt: 'Tipología B/D/E - Vista 1' },
          { src: '/images/03.png', alt: 'Tipología B/D/E - Vista 2' },
          { src: '/images/01.png', alt: 'Tipología B/D/E - Vista 3' },
        ],
        description: 'Apartamento en Torre 1 de 3 dormitorios con 3 baños.',
        size: '319,80 m²',
        features: ['Wifi', '3 Baños', '3 Camas'],
      },
      'Tipología C/F': {
        images: [
          { src: '/images/03.png', alt: 'Tipología C/F - Vista 1' },
          { src: '/images/01.png', alt: 'Tipología C/F - Vista 2' },
          { src: '/images/02.png', alt: 'Tipología C/F - Vista 3' },
        ],
        description: 'Apartamento en Torre 1 de 2 dormitorios con 2 baños.',
        size: '259,58 m²',
        features: ['Wifi', '2 Baños', '2 Camas'],
      },
      'Terraza/Quincho': {
        images: [
          { src: '/images/01.png', alt: 'Terraza/Quincho - Vista 1' },
          { src: '/images/02.png', alt: 'Terraza/Quincho - Vista 2' },
        ],
        description: 'Terraza y quincho en la azotea de Torre 1.',
        size: 'Común',
        features: ['Wifi', '1 Baño'],
      },
      'Subsuelo': {
        images: [
          { src: '/images/01.png', alt: 'Subsuelo - Vista 1' },
          { src: '/images/02.png', alt: 'Subsuelo - Vista 2' },
        ],
        description: 'Sala de usos múltiples en el subsuelo de Torre 1.',
        size: 'Común',
        features: ['Wifi'],
      },
    },
    torre2: {
      'Tipología A/B': {
        images: [
          { src: '/images/04.png', alt: 'Tipología A/B - Vista 1' },
          { src: '/images/01.png', alt: 'Tipología A/B - Vista 2' },
        ],
        description: 'Apartamento en Torre 2 de diseño moderno.',
        size: 'N/A',
        features: ['Wifi', '1 Baño', '1 Cama'],
      },
      'Terraza/Quincho': {
        images: [
          { src: '/images/01.png', alt: 'Terraza/Quincho - Vista 1' },
          { src: '/images/02.png', alt: 'Terraza/Quincho - Vista 2' },
        ],
        description: 'Terraza y quincho en la azotea de Torre 2.',
        size: 'Común',
        features: ['Wifi', '1 Baño'],
      },
      'Subsuelo': {
        images: [
          { src: '/images/01.png', alt: 'Subsuelo - Vista 1' },
          { src: '/images/02.png', alt: 'Subsuelo - Vista 2' },
        ],
        description: 'Sala de usos múltiples en el subsuelo de Torre 2.',
        size: 'Común',
        features: ['Wifi'],
      },
    },
  };

  const data = apartmentData[tower]?.[typology] || {
    images: [{ src: '/images/default.jpg', alt: 'Imagen por defecto' }],
    description: 'Información no disponible.',
    size: 'N/A',
    features: [],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Overlay para cerrar */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Contenedor principal del modal */}
      <div className="relative w-11/12 max-w-5xl h-3/4 bg-white rounded-lg overflow-hidden flex">
        {/* Sección de Imágenes (60%) */}
        <div className="w-3/5 p-6">
          <ImageCarousel images={data.images} />
        </div>

        {/* Sección de Información (40%) */}
        <div className="w-2/5 p-6 bg-gray-50 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{typology}</h2>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <p className="text-gray-700 mb-4"><strong>Tamaño:</strong> {data.size}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Características:</h3>
              <div className="flex flex-wrap gap-3">
                {data.features.includes('Wifi') && <Wifi className="text-blue-500" size={20} />}
                {data.features.includes('1 Baño') && <Bath className="text-green-500" size={20} />}
                {data.features.includes('2 Baños') && <Bath className="text-green-500" size={20} />}
                {data.features.includes('3 Baños') && <Bath className="text-green-500" size={20} />}
                {data.features.includes('1 Cama') && <Bed className="text-purple-500" size={20} />}
                {data.features.includes('2 Camas') && <Bed className="text-purple-500" size={20} />}
                {data.features.includes('3 Camas') && <Bed className="text-purple-500" size={20} />}
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        {/* Botón de cerrar en la esquina */}
        <button
          className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-200 shadow-lg"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ApartmentDetailModal;