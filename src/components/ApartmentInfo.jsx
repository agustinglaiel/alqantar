// Cambios en src/components/ApartmentInfo.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apartmentData from '../utils/apartmentData';

function ApartmentInfo({ tower, typology, buttonText = "Más información", onDetailsClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const info = apartmentData[tower]?.[typology] || {
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

      <div className="p-4 pt-2">
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          onClick={onDetailsClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ApartmentInfo;