import React from 'react';
import { Wifi, Bath, Bed } from 'lucide-react';

function ApartmentInfo({ tower, typology, onDetailsClick }) {
  const info = {
    'torre1': {
      'Tipología A': {
        description: 'Apartamento en Torre 1 de 2 dormitorios con 2 baños.',
        size: '273,78 m²',
        features: ['Wifi', '2 Baños', '2 Camas'],
      },
      'Tipología B/D/E': {
        description: 'Apartamento en Torre 1 de 3 dormitorios con 3 baños.',
        size: '319,80 m²',
        features: ['Wifi', '3 Baños', '3 Camas'],
      },
      'Tipología C/F': {
        description: 'Apartamento en Torre 1 de 2 dormitorios con 2 baños.',
        size: '259,58 m²',
        features: ['Wifi', '2 Baños', '2 Camas'],
      },
      'Terraza/Quincho': {
        description: 'Terraza y quincho en la azotea de Torre 1.',
        size: 'Común',
        features: ['Wifi', '1 Baño'], 
      },
      'Subsuelo': {
        description: 'Sala de usos múltiples en el subsuelo de Torre 1.',
        size: 'Común',
        features: ['Wifi'], 
      },
    },
    'torre2': {
      'Tipología A/B': {
        description: 'No disponible en Torre 2.',
        size: 'N/A',
        features: ['Wifi', '1 Baño', '1 Cama'],
      },
      'Terraza/Quincho': {
        description: 'Terraza y quincho en la azotea de Torre 2.',
        size: 'Común',
        features: ['Wifi', '1 Baño'], 
      },
      'Subsuelo': {
        description: 'Sala de usos múltiples en el subsuelo de Torre 2.',
        size: 'Común',
        features: ['Wifi'], 
      },
    },
  }[tower]?.[typology] || {
    description: 'Información no disponible.',
    size: 'N/A',
    features: [],
  };

  return (
    <div className="flex-1 p-4 bg-gray-50 rounded-b-lg text-left flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{typology || 'Sin tipología'}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{info.description}</p>
        <p className="text-sm text-gray-700 mb-3"><strong>Tamaño:</strong> {info.size}</p>
        <div className="flex space-x-3 mb-4">
          {info.features.includes('Wifi') && <Wifi className="text-blue-500" size={18} />}
          {info.features.includes('1 Baño') && <Bath className="text-green-500" size={18} />}
          {info.features.includes('2 Baños') && <Bath className="text-green-500" size={18} />}
          {info.features.includes('3 Baños') && <Bath className="text-green-500" size={18} />}
          {info.features.includes('1 Cama') && <Bed className="text-purple-500" size={18} />}
          {info.features.includes('2 Camas') && <Bed className="text-purple-500" size={18} />}
          {info.features.includes('3 Camas') && <Bed className="text-purple-500" size={18} />}
        </div>
      </div>
      <button
        className="w-full px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm"
        onClick={onDetailsClick}
      >
        Ver Detalles
      </button>
    </div>
  );
}

export default ApartmentInfo;