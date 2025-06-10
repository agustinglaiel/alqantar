import React, { useState, useEffect } from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Overlay para cerrar */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Contenedor principal */}
      <div className="relative w-11/12 h-5/6 max-w-6xl max-h-4xl">
        {/* Imagen/Video principal */}
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
          {isVideo ? (
            <iframe
              className="w-full h-full"
              src={currentItem.src}
              title={currentItem.alt}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay izquierdo */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
            onMouseEnter={() => setLeftHover(true)}
            onMouseLeave={() => setLeftHover(false)}
            onClick={goToPrevious}
          >
            {/* Gradiente oscuro izquierdo */}
            <div className={`absolute left-0 top-0 w-1/2 h-full transition-opacity duration-200 ${
              leftHover ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
            }}
            />
            {/* Flecha izquierda */}
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 ${
              leftHover ? 'opacity-100' : 'opacity-0'
            }`}>
              <svg
                className="w-12 h-12 text-white drop-shadow-lg"
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

          {/* Overlay derecho */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
            onMouseEnter={() => setRightHover(true)}
            onMouseLeave={() => setRightHover(false)}
            onClick={goToNext}
          >
            {/* Gradiente oscuro derecho */}
            <div className={`absolute right-0 top-0 w-1/2 h-full transition-opacity duration-200 ${
              rightHover ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
            }}
            />
            {/* Flecha derecha */}
            <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 ${
              rightHover ? 'opacity-100' : 'opacity-0'
            }`}>
              <svg
                className="w-12 h-12 text-white drop-shadow-lg"
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

        {/* Botón cerrar */}
        <button
          className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-200 shadow-lg"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
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

        {/* Contador de imágenes */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {mediaItems.length}
        </div>
      </div>
    </div>
  );
}

export default MediaDisplay;