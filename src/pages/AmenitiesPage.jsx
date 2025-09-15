// src/pages/AmenitiesPage.jsx
import React, { useState, useEffect } from "react";
import { 
  Waves, 
  Car, 
  Shield, 
  Wifi, 
  Users, 
  TreePine, 
  Dumbbell, 
  Baby, 
  Gamepad2, 
  Coffee, 
  Utensils, 
  ShoppingBag,
  Heart,
  Sparkles,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Bubbles
} from "lucide-react";
import amenitiesData, { amenityCarouselImages } from "../utils/amenitiesData";
import Header from "../components/Header";
import MediaDisplay from "../components/MediaDisplay";

// Mapeo de iconos para diferentes tipos de amenities
const getAmenityIcon = (title) => {
  const iconMap = {
    'piscina': Waves,
    'gimnasio': Dumbbell,
    'sauna': Bubbles,
    'sala de relax': Heart,
    'espacio de coworking': Users,
    'sum privado': Coffee,
    'espacios verdes': TreePine,
    'cocheras': Car,
    'seguridad': Shield,
  };
  
  const titleLower = title.toLowerCase();
  for (const [key, IconComponent] of Object.entries(iconMap)) {
    if (titleLower.includes(key)) {
      return IconComponent;
    }
  }
  return Star; // Icono por defecto
};

function AmenitiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMediaDisplayOpen, setIsMediaDisplayOpen] = useState(false);
  const [mediaDisplayIndex, setMediaDisplayIndex] = useState(0);
  const carousel = amenityCarouselImages;

  // Distancia mínima requerida para considerar un swipe
  const minSwipeDistance = 50;

  const handleImageClick = (index) => {
    // Abrir MediaDisplay con la imagen seleccionada
    setMediaDisplayIndex(index);
    setIsMediaDisplayOpen(true);
  };

  const closeMediaDisplay = () => {
    setIsMediaDisplayOpen(false);
  };

  // Convertir datos del carrusel al formato que espera MediaDisplay
  const mediaItems = carousel.map(item => ({
    src: item.src,
    alt: item.title,
    type: "image"
  }));

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

  // Funciones para manejar swipe en móvil
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
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
      <Header />
      <div className="relative z-10 pt-32 bg-opacity-95">
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
              <div 
                className="relative h-[34rem] overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
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

                <button
                  onClick={prevImage}
                  disabled={isTransitioning}
                  className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 z-20"
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
                  className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 z-20"
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

                {/* Indicadores de posición */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                  {carousel.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MediaDisplay para visualizar imágenes en pantalla completa */}
          <MediaDisplay
            isOpen={isMediaDisplayOpen}
            onClose={closeMediaDisplay}
            mediaItems={mediaItems}
            initialIndex={mediaDisplayIndex}
          />

          {/* Lista completa de amenities - VERSIÓN MEJORADA */}
          <div className="mt-16">
            {/* Título de sección */}
            {/* <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Todos Nuestros Servicios
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div> */}

            {/* Grid de amenities con nuevo diseño */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenitiesData.map((amenity, index) => {
                const IconComponent = getAmenityIcon(amenity.title);
                
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Header con icono */}
                    <div className="bg-gray-50 p-6 border-b border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center transition-transform duration-300">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300">
                            {amenity.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {amenity.description}
                      </p>
                      
                      {amenity.features && amenity.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            Características
                          </h4>
                          <ul className="space-y-2">
                            {amenity.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sección adicional de beneficios */}
            <div className="mt-16 bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  ¿Por qué elegirnos?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Cada servicio ha sido cuidadosamente seleccionado para brindarte la mejor experiencia de vida
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-gray-800" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Calidad Premium</h4>
                    <p className="text-sm text-gray-600">Servicios de la más alta calidad</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-gray-800" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Disponibilidad 24/7</h4>
                    <p className="text-sm text-gray-600">Acceso cuando lo necesites</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-gray-800" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Bienestar Total</h4>
                    <p className="text-sm text-gray-600">Pensado para tu comodidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmenitiesPage;