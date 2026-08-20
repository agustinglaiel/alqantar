import React, { useState, useMemo, useRef, useEffect } from 'react';
import MediaTile from './media/MediaTile';
import ProgressiveImage from './ProgressiveImage';

function ImageCarousel({ images, aspect = '16/9', onImageClick }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const thumbnailsRef = useRef(null);

  const validImages = Array.isArray(images) && images.length > 0
    ? images
    : [{ src: '/images/default.webp', alt: 'Imagen por defecto' }];

  const aspectStyle = useMemo(() => ({ aspectRatio: aspect }), [aspect]);

  // Función para desplazar las miniaturas
  const scrollToThumbnail = (index) => {
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const thumbnails = container.children;
      if (thumbnails[index]) {
        const thumbnail = thumbnails[index];
        const containerWidth = container.offsetWidth;
        const thumbnailLeft = thumbnail.offsetLeft;
        const thumbnailWidth = thumbnail.offsetWidth;
        
        // Calcular la posición para centrar la miniatura
        const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  // Efecto para desplazar automáticamente cuando cambia la imagen seleccionada
  useEffect(() => {
    scrollToThumbnail(selectedImageIndex);
  }, [selectedImageIndex]);

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
    <div className="flex h-full flex-col">
      {/* Área fija con relación de aspecto */}
      <div
        className="relative mb-4 w-full overflow-hidden rounded-md bg-white shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Contenedor con ratio fijo (16:9 por defecto) */}
        <div className="relative w-full" style={aspectStyle}>
          {/* Imagen entra completa. El click para ampliar vive en el <button>
              que la envuelve (no en la imagen directamente) para que sea
              alcanzable por teclado — antes el onClick estaba en un <div>. */}
          <button
            type="button"
            onClick={() => onImageClick && onImageClick(selectedImageIndex)}
            aria-label="Ver imagen ampliada"
            className="absolute inset-0 size-full cursor-pointer"
          >
            <ProgressiveImage
              src={validImages[selectedImageIndex].src}
              alt={validImages[selectedImageIndex].alt || 'Imagen'}
              fit="contain"
              sizes="(min-width: 1024px) 830px, 92vw"
              priority
              className="size-full"
            />
          </button>

          {/* Flecha izquierda */}
          {showLeftArrow && (
            <button
              onClick={handlePrevious}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-fast hover:bg-black/70"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Flecha derecha */}
          {showRightArrow && (
            <button
              onClick={handleNext}
              aria-label="Imagen siguiente"
              className="absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-fast hover:bg-black/70"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Indicador */}
          {validImages.length > 1 && (showLeftArrow || showRightArrow) && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1">
              <span className="text-sm text-white">
                {selectedImageIndex + 1} / {validImages.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Miniaturas */}
      {validImages.length > 1 && (
        <div 
          ref={thumbnailsRef}
          className="flex flex-nowrap space-x-2 overflow-x-auto overflow-y-hidden py-2 lg:space-x-4"
        >
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`size-16 shrink-0 transition-transform duration-fast lg:size-24 ${
                index === selectedImageIndex ? 'scale-125' : 'hover:scale-110'
              }`}
            >
              <MediaTile
                src={image.src}
                alt={image.alt}
                type="image"
                onClick={() => handleImageClick(index)}
                sizeClassName="size-full"
                imageFit="contain"
                sizes="96px"
                scaleOnHover
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
