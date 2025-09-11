import React, { useState } from 'react';
import { BedDouble, ShowerHead, ChefHat, DoorOpen, SquareIcon, ChevronLeft, ChevronRight, Car } from 'lucide-react';

function ApartmentInfo({ tower, typology, onDetailsClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const info = {
    'torre1': {
      'Tipología 1': {
        description: 'Apartamento en Torre 1 y 2 de 2 dormitorios con 2 baños.',
        size: '275 m²',
        features: [
          { icon: BedDouble, value: '2', color: 'bg-gray-600', label: 'Dormitorios' },
          { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
          { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
          { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
          { icon: DoorOpen, value: '3', color: 'bg-gray-600', label: 'Balcones' },
          { icon: SquareIcon, value: '275 m²', color: 'bg-gray-600', label: 'Superficie' },
        ],
      },
      'Tipología 2': {
        description: 'Apartamento en Torre 1 y 2 de 3 dormitorios con 3 baños.',
        size: '320 m²',
        features: [
          { icon: BedDouble, value: '3', color: 'bg-gray-600', label: 'Dormitorios' },
          { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
          { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
          { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
          { icon: DoorOpen, value: '4', color: 'bg-gray-600', label: 'Balcones' },
          { icon: SquareIcon, value: '320 m²', color: 'bg-gray-600', label: 'Superficie' },
        ],
      },
      'Tipología 3': {
        description: 'Apartamento en Torre 1 y 2 de 2 dormitorios con 2 baños.',
        size: '265 m²',
        features: [
          { icon: BedDouble, value: '2', color: 'bg-gray-600', label: 'Dormitorios' },
          { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
          { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
          { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
          { icon: DoorOpen, value: '2', color: 'bg-gray-600', label: 'Balcones' },
          { icon: SquareIcon, value: '265 m²', color: 'bg-gray-600', label: 'Superficie' },
        ],
      },
      // 'Terraza/Quincho': {
      //   description: 'Terraza y quincho en la azotea de Torre 1 y 2.',
      //   size: 'Común',
      //   features: [
      //     { icon: BedDouble, value: '0', color: 'bg-gray-600', label: 'Dormitorios' },
      //     { icon: ShowerHead, value: '1', color: 'bg-gray-600', label: 'Baños' },
      //     { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Quincho' },
      //     { icon: DoorOpen, value: 'Balcones', color: 'bg-gray-600', label: '' },
      //     { icon: SquareIcon, value: 'Espacio Común', color: 'bg-gray-600', label: '' },
      //   ],
      // },
      // 'Subsuelo': {
      //   description: 'Sala de usos múltiples en el subsuelo de Torre 1 y 2.',
      //   size: 'Común',
      //   features: [
      //     { icon: BedDouble, value: '0', color: 'bg-gray-600' },
      //     { icon: ShowerHead, value: '0', color: 'bg-gray-600' },
      //     { icon: ChefHat, value: '0', color: 'bg-gray-600' },
      //     { icon: DoorOpen, value: '0', color: 'bg-gray-600' },
      //     { icon: SquareIcon, value: 'Común', color: 'bg-gray-600' },
      //   ],
      // },
    },
    'torre2': {
      'Tipología 1': {
        description: 'Apartamento en Torres VIP de diseño moderno.',
        size: 'N/A',
        features: [
          { icon: BedDouble, value: '1', color: 'bg-gray-600', label: 'Dormitorios' },
          { icon: ShowerHead, value: '1', color: 'bg-gray-600', label: 'Baños' },
          { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
          { icon: DoorOpen, value: '1', color: 'bg-gray-600', label: 'Balcones' },
          { icon: SquareIcon, value: 'N/A', color: 'bg-gray-600', label: 'Superficie' },
        ],
      },
      // 'Terraza/Quincho': {
      //   description: 'Terraza y quincho en la azotea de Torres VIP.',
      //   size: 'Común',
      //   features: [
      //     { icon: BedDouble, value: '0', color: 'bg-gray-600', label: 'Dormitorios' },
      //     { icon: ShowerHead, value: '1', color: 'bg-gray-600', label: 'Baños' },
      //     { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Quincho' },
      //     { icon: DoorOpen, value: '0', color: 'bg-gray-600', label: 'Balcones' },
      //     { icon: SquareIcon, value: 'Espacio Común', color: 'bg-gray-600', label: '' },
      //   ],
      // },
      // 'Subsuelo': {
      //   description: 'Sala de usos múltiples en el subsuelo de Torres VIP.',
      //   size: 'Común',
      //   features: [],
      // },
    },
  }[tower]?.[typology] || {
    description: 'Información no disponible.',
    size: 'N/A',
    features: [],
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < info.features.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Sección de características con navegación por flechas */}
      <div className="p-4 bg-white relative">
        <div className="relative overflow-hidden w-[300px] mx-auto">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}px)` }}
          >
            {info.features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-[100px] flex-shrink-0 text-center"
              >
                <div className={`w-8 h-8 ${feature.color} rounded-full flex items-center justify-center mb-1`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">{feature.value}</span>
                <span className="text-xs text-gray-500">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Botones de navegación, siempre visibles con tono suave */}
        {info.features.length > 3 && (
          <>
            {currentIndex > 0 && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 bg-opacity-30 p-1.5 rounded-full hover:bg-opacity-50 transition-all duration-200"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
            )}
            {currentIndex < info.features.length - 3 && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 bg-opacity-30 p-1.5 rounded-full hover:bg-opacity-50 transition-all duration-200"
                onClick={handleNext}
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Botón Más información */}
      <div className="p-4 pt-2">
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          onClick={onDetailsClick}
        >
          Más información
        </button>
      </div>
    </div>
  );
}

export default ApartmentInfo;