import React from "react";
import { CheckCircle, MessageCircleMore } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import apartmentData from "../utils/apartmentData";

function ApartmentDetailModal({ isOpen, onClose, tower, typology }) {
  const data = apartmentData[tower]?.[typology] || {
    images: [{ src: "/images/default.jpg", alt: "Imagen por defecto" }],
    description: "Información no disponible.",
    size: "N/A",
    features: [],
    details: [],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Carrusel de imágenes */}
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full p-4 lg:p-6">
          <ImageCarousel images={data.images} />
        </div>

        {/* Panel de info (contenido scroll + botones fijos) */}
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full p-4 lg:p-6 bg-white flex flex-col overflow-hidden">
          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto scroll-on-hover pr-2">
            {/* Título + descripción */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                {typology}
              </h2>
              <p className="text-gray-900 text-base md:text-md text-justify leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Detalles extendidos */}
            {data.details?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3">
                  Detalles del departamento
                </h3>
                <ul className="space-y-2">
                  {data.details.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle
                        size={18}
                        className="mt-0.5 mr-2 text-green-500 flex-shrink-0"
                      />
                      <span className="text-sm lg:text-base text-justify leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer fijo con botones */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
            <a
              href="https://wa.me/5493517496383"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 text-sm lg:text-base text-center flex items-center justify-center gap-2"
            >
              Comunicate para más información
              <MessageCircleMore size={18} className="text-white" />
            </a>

            <button
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm lg:text-base"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApartmentDetailModal;
