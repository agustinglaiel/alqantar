import React, { useState, useMemo } from 'react';
import MediaCard from './MediaCard';

function ImageCarousel({ images, aspect = '16/9' }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const validImages = Array.isArray(images) && images.length > 0
    ? images
    : [{ src: '/images/default.jpg', alt: 'Imagen por defecto' }];

  const aspectStyle = useMemo(() => ({ aspectRatio: aspect }), [aspect]);

  const handleImageClick = (index) => setSelectedImageIndex(index);
  const handlePrevious = () =>
    setSelectedImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  const handleNext = () =>
    setSelectedImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    if (x < width * 0.3) {
      setShowLeftArrow(validImages.length > 1);
      setShowRightArrow(false);
    } else if (x > width * 0.7) {
      setShowRightArrow(validImages.length > 1);
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  };
  const handleMouseLeave = () => {
    setShowLeftArrow(false);
    setShowRightArrow(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Área fija con relación de aspecto */}
      <div
        className="relative w-full rounded-lg overflow-hidden shadow-lg mb-4 bg-white"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Contenedor con ratio fijo (16:9 por defecto) */}
        <div className="relative w-full" style={aspectStyle}>
          {/* Imagen entra completa */}
          <img
            src={validImages[selectedImageIndex].src}
            alt={validImages[selectedImageIndex].alt || 'Imagen'}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Flecha izquierda */}
          {showLeftArrow && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Flecha derecha */}
          {showRightArrow && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Indicador */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3 py-1">
              <span className="text-white text-sm">
                {selectedImageIndex + 1} / {validImages.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Miniaturas */}
      {validImages.length > 1 && (
        <div className="flex overflow-x-auto overflow-y-hidden space-x-2 lg:space-x-4 pb-2 flex-nowrap">
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24 ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
            >
              <MediaCard
                src={image.src}
                alt={image.alt}
                type="image"
                onClick={() => handleImageClick(index)}
                className="w-full h-full"
                imageFit="contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
