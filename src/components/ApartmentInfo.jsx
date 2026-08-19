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
    <div className="flex flex-1 flex-col">
      <div className="relative bg-white p-4">
        <div className="relative mx-auto w-[300px] overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}px)` }}
          >
            {info.features.map((feature, index) => (
              <div
                key={index}
                className="flex w-[100px] shrink-0 flex-col items-center justify-center text-center"
              >
                <div className={`size-8 ${feature.color} mb-1 flex items-center justify-center rounded-full`}>
                  <feature.icon className="size-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-800">{feature.value}</span>
                <span className="text-xs text-gray-500">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        {info.features.length > 3 && (
          <>
            {currentIndex > 0 && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 bg-opacity-30 p-1.5 transition-all duration-200 hover:bg-opacity-50"
                onClick={handlePrev}
              >
                <ChevronLeft className="size-4 text-gray-400" />
              </button>
            )}
            {currentIndex < info.features.length - 3 && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 bg-opacity-30 p-1.5 transition-all duration-200 hover:bg-opacity-50"
                onClick={handleNext}
              >
                <ChevronRight className="size-4 text-gray-400" />
              </button>
            )}
          </>
        )}
      </div>

      <div className="p-4 pt-2">
        <button
          className="w-full rounded-full bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-900 hover:to-gray-700 hover:shadow-xl"
          onClick={onDetailsClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ApartmentInfo;