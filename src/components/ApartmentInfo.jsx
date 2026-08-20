// Cambios en src/components/ApartmentInfo.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apartmentData from '../utils/apartmentData';
import Button from './ui/Button';

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
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200/30 p-1.5 transition-all duration-fast hover:bg-gray-200/50"
                onClick={handlePrev}
              >
                <ChevronLeft className="size-4 text-gray-400" />
              </button>
            )}
            {currentIndex < info.features.length - 3 && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200/30 p-1.5 transition-all duration-fast hover:bg-gray-200/50"
                onClick={handleNext}
              >
                <ChevronRight className="size-4 text-gray-400" />
              </button>
            )}
          </>
        )}
      </div>

      <div className="p-4 pt-2">
        <Button onClick={onDetailsClick} variant="primary" className="w-full">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default ApartmentInfo;