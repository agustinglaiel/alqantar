// src/pages/AmenitiesPage.jsx
import React, { useState, useEffect } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import amenitiesData, { amenityCarouselImages } from "../utils/amenitiesData";

function AmenitiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carousel = amenityCarouselImages;

  const handleImageClick = (index) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const nextImage = () => {
    if (!isTransitioning && carousel.length > 1) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % carousel.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevImage = () => {
    if (!isTransitioning && carousel.length > 1) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + carousel.length) % carousel.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Auto-rotate (opcional)
  useEffect(() => {
    if (carousel.length <= 1) return;
    const interval = setInterval(() => {
      if (!isTransitioning) nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning, carousel.length]);

  return (
    <div className="relative">
      <BackgroundSlider />

      <div className="relative z-10 bg-white bg-opacity-95">
        <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-12">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              Amenities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todas las comodidades y servicios exclusivos que hemos
              diseñado para enriquecer tu experiencia de vida en nuestro
              complejo residencial.
            </p>
          </div>

          {/* Carrusel 3D */}
          {carousel.length > 0 && (
            <div className="mb-4">
              {/* Más altura para alojar el centro escalado */}
              <div className="relative h-[34rem] overflow-hidden">
                {/* Contenedor del carrusel */}
                <div
                  className="flex items-center justify-center h-full"
                  style={{ perspective: "1000px" }}
                >
                  {carousel.map((item, index) => {
                    const offset = index - currentIndex;
                    const isCenter = offset === 0;
                    const isLeft =
                      offset === -1 ||
                      (offset === carousel.length - 1 && currentIndex === 0);
                    const isRight =
                      offset === 1 ||
                      (offset === -(carousel.length - 1) &&
                        currentIndex === carousel.length - 1);

                    // 📏 Parámetros visuales (más grande el centro)
                    const CENTER_SCALE = 1.4;
                    const SIDE_SCALE = 0.85;
                    const FAR_SCALE = 0.7;

                    const LEFT_OFFSET = 380;
                    const RIGHT_OFFSET = 380;
                    const FAR_OFFSET = 560;

                    let transform = "";
                    let zIndex = 1;
                    let opacity = 0.4;

                    if (isCenter) {
                      transform = `translateX(0) translateZ(0) scale(${CENTER_SCALE})`;
                      zIndex = 10;
                      opacity = 1;
                    } else if (isLeft) {
                      transform = `translateX(-${LEFT_OFFSET}px) translateZ(-240px) rotateY(25deg) scale(${SIDE_SCALE})`;
                      zIndex = 5;
                      opacity = 0.7;
                    } else if (isRight) {
                      transform = `translateX(${RIGHT_OFFSET}px) translateZ(-240px) rotateY(-25deg) scale(${SIDE_SCALE})`;
                      zIndex = 5;
                      opacity = 0.7;
                    } else {
                      transform = `translateX(${offset > 0 ? FAR_OFFSET : -FAR_OFFSET}px) translateZ(-460px) scale(${FAR_SCALE})`;
                      zIndex = 1;
                      opacity = 0.3;
                    }

                    return (
                      <div
                        key={`${item.src}-${index}`}
                        className={`absolute cursor-pointer transition-all duration-500 ease-in-out ${
                          isTransitioning ? "" : "hover:scale-105"
                        }`}
                        style={{
                          transform,
                          zIndex,
                          opacity,
                          transformStyle: "preserve-3d",
                        }}
                        onClick={() => handleImageClick(index)}
                      >
                        <div
                          className={`relative w-96 h-72 rounded-xl overflow-hidden shadow-2xl bg-white ${
                            isCenter ? "ring-2 ring-blue-500/30" : ""
                          }`}
                        >
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Overlay con información (solo en el centro) */}
                          {isCenter && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="text-sm opacity-90 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Controles de navegación */}
                <button
                  onClick={prevImage}
                  disabled={isTransitioning}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 z-20"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  disabled={isTransitioning}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 z-20"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Lista completa de amenities */}
          <div>
            {/* <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Todos Nuestros Servicios
            </h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenitiesData.map((amenity, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {amenity.description}
                  </p>
                  {amenity.features && (
                    <ul className="mt-4 space-y-1">
                      {amenity.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-500">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AmenitiesPage;
