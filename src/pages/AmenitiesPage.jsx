// src/pages/AmenitiesPage.jsx
import React, { useState, useEffect } from "react";
import ProgressiveImage from "../components/ProgressiveImage";
import {
  Waves,
  Car,
  Shield,
  Users,
  TreePine,
  Dumbbell,
  Coffee,
  Heart,
  Clock,
  Star,
  CheckCircle,
  Bubbles
} from "lucide-react";
import amenitiesData, { amenityCarouselImages } from "../utils/amenitiesData";
import Lightbox from "../components/media/Lightbox";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const carousel = amenityCarouselImages;

  // Distancia mínima requerida para considerar un swipe
  const minSwipeDistance = 50;

  const handleImageClick = (index) => {
    // Abrir el lightbox con la imagen seleccionada
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Convertir datos del carrusel al formato que espera Lightbox
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
    <Page className="relative">
      <div className="relative pb-12">
        <Container>
          <PageHeader
            className="mb-4"
            title="Amenities"
            description="Descubre todas las comodidades y servicios exclusivos que hemos diseñado para enriquecer tu experiencia de vida en nuestro complejo residencial."
          />

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
                  className="flex h-full items-center justify-center"
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
                        className={`absolute cursor-pointer transition-all duration-slow ease-in-out ${
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
                          className={`relative h-72 w-96 overflow-hidden rounded-md bg-white shadow-md ${
                            isCenter ? "ring-2 ring-blue-500/30" : ""
                          }`}
                        >
                          <ProgressiveImage
                            src={item.src}
                            alt={item.title}
                            sizes="384px"
                            className="size-full"
                          />
                          {isCenter && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                <h3 className="mb-2 text-2xl font-bold">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="line-clamp-3 text-sm opacity-90">
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
                  className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-800 shadow-sm transition-all duration-fast hover:bg-white disabled:opacity-50 md:block"
                >
                  <svg
                    className="size-6"
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
                  className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-800 shadow-sm transition-all duration-fast hover:bg-white disabled:opacity-50 md:block"
                >
                  <svg
                    className="size-6"
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
                <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
                  {carousel.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`size-2 rounded-full transition-all duration-base ${
                        index === currentIndex 
                          ? 'scale-125 bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lightbox para visualizar imágenes en pantalla completa */}
          <Lightbox
            isOpen={isLightboxOpen}
            onClose={closeLightbox}
            mediaItems={mediaItems}
            initialIndex={lightboxIndex}
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {amenitiesData.map((amenity, index) => {
                const IconComponent = getAmenityIcon(amenity.title);
                
                return (
                  <div
                    key={index}
                    className="group overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm transition-all duration-base"
                  >
                    {/* Header con icono */}
                    <div className="border-b border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <div className="flex size-12 items-center justify-center rounded-md bg-gray-800 transition-transform duration-base">
                            <IconComponent className="size-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 transition-colors duration-base">
                            {amenity.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <p className="mb-4 leading-relaxed text-gray-600">
                        {amenity.description}
                      </p>
                      
                      {amenity.features && amenity.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="mb-3 flex items-center text-sm font-semibold text-gray-800">
                            <CheckCircle className="mr-2 size-4 text-green-500" />
                            Características
                          </h4>
                          <ul className="space-y-2">
                            {amenity.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                <div className="mt-2 size-1.5 shrink-0 rounded-full bg-gray-800"></div>
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
            <div className="mt-16 rounded-md border border-gray-200 bg-gray-50 p-8">
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  ¿Por qué elegirnos?
                </h3>
                <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                  Cada servicio ha sido cuidadosamente seleccionado para brindarte la mejor experiencia de vida
                </p>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100">
                      <CheckCircle className="size-8 text-gray-800" />
                    </div>
                    <h4 className="mb-2 font-semibold text-gray-800">Calidad Premium</h4>
                    <p className="text-sm text-gray-600">Servicios de la más alta calidad</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100">
                      <Clock className="size-8 text-gray-800" />
                    </div>
                    <h4 className="mb-2 font-semibold text-gray-800">Disponibilidad 24/7</h4>
                    <p className="text-sm text-gray-600">Acceso cuando lo necesites</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100">
                      <Heart className="size-8 text-gray-800" />
                    </div>
                    <h4 className="mb-2 font-semibold text-gray-800">Bienestar Total</h4>
                    <p className="text-sm text-gray-600">Pensado para tu comodidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Page>
  );
}

export default AmenitiesPage;