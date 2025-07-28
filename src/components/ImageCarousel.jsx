import React, { useState } from 'react';
import MediaCard from './MediaCard';

function ImageCarousel({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Asegurarse de que images es un array válido
  const validImages = Array.isArray(images) && images.length > 0 ? images : [{ src: '/images/default.jpg', alt: 'Imagen por defecto' }];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Imagen Principal */}
      <div className="flex-grow rounded-lg overflow-hidden shadow-lg mb-4">
        <img
          src={validImages[selectedImageIndex].src}
          alt={validImages[selectedImageIndex].alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Carrusel de Miniaturas */}
      <div className="flex overflow-x-auto overflow-y-hidden space-x-4 pb-2 flex-nowrap">
        {validImages.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-24 h-24 ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
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
    </div>
  );
}

export default ImageCarousel;