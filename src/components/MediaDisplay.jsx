import React, { useState, useEffect } from "react";
import ProgressiveImage from "./ProgressiveImage";

function MediaDisplay({ isOpen, onClose, mediaItems, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === mediaItems.length - 1 ? 0 : prev + 1
    );
  };

  if (!isOpen || !mediaItems || mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex];
  const isVideo = currentItem.type?.toLowerCase() === "video";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      {/* Overlay para cerrar */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Contenedor principal: ajustado para mobile */}
      <div className="relative h-[80vh] max-h-[90vh] w-[90vw] max-w-5xl sm:h-[85vh] sm:w-[85vw]">
        {/* Imagen/Video principal */}
        <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg bg-black">
          {isVideo ? (
            <div className="relative size-full">
              <iframe
                className="size-full object-contain" // Usar object-contain para videos también
                src={currentItem.src}
                title={currentItem.alt}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <ProgressiveImage
              src={currentItem.src}
              alt={currentItem.alt}
              fit="contain"
              sizes="(min-width: 1024px) 1024px, 90vw"
              priority
              className="size-full"
            />
          )}

          {/* Overlay izquierdo: reducido en mobile */}
          <div
            className="absolute left-0 top-0 h-full w-1/3 cursor-pointer sm:w-1/2"
            onMouseEnter={() => setLeftHover(true)}
            onMouseLeave={() => setLeftHover(false)}
            onClick={goToPrevious}
          >
            {/* Gradiente oscuro izquierdo */}
            <div className={`absolute left-0 top-0 size-full transition-opacity duration-200 ${
              leftHover ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
            }}
            />
            {/* Flecha izquierda: más pequeña en mobile */}
            <div className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-200 sm:left-4 ${
              leftHover ? 'opacity-100' : 'opacity-0'
            }`}>
              <svg
                className="size-8 text-white drop-shadow-lg sm:size-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>

          {/* Overlay derecho: reducido en mobile */}
          <div
            className="absolute right-0 top-0 h-full w-1/3 cursor-pointer sm:w-1/2"
            onMouseEnter={() => setRightHover(true)}
            onMouseLeave={() => setRightHover(false)}
            onClick={goToNext}
          >
            {/* Gradiente oscuro derecho */}
            <div className={`absolute right-0 top-0 size-full transition-opacity duration-200 ${
              rightHover ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
            }}
            />
            {/* Flecha derecha: más pequeña en mobile */}
            <div className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-200 sm:right-4 ${
              rightHover ? 'opacity-100' : 'opacity-0'
            }`}>
              <svg
                className="size-8 text-white drop-shadow-lg sm:size-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Botón cerrar: ajustado para mejor touch en mobile */}
        <button
          className="absolute -right-2 -top-6 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors duration-200 hover:bg-gray-200 sm:-right-4 sm:-top-4 sm:size-10"
          onClick={onClose}
        >
          <svg
            className="size-6 sm:size-6"
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

        {/* Contador de imágenes: ajustado para mobile */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black bg-opacity-50 px-3 py-1 text-sm text-white sm:-bottom-8">
          {currentIndex + 1} / {mediaItems.length}
        </div>
      </div>
    </div>
  );
}

export default MediaDisplay;