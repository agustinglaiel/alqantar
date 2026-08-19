import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircleMore } from "lucide-react";

import apartmentData from "../utils/apartmentData";
import ImageCarousel from "../components/ImageCarousel";
import MediaDisplay from "../components/MediaDisplay";
import FutureUpgrade from "../components/FutureUpgrade";

export default function ApartmentDetailPage() {
  const { tower, typology: typParam } = useParams();
  const typology = decodeURIComponent(typParam || "");
  
  // Estado para controlar la posición del aside
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Estados para el modal de imagen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const data = apartmentData[tower]?.[typology];

  // Detectar dirección del scroll y visibilidad del header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsHeaderVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CTA de WhatsApp con mensaje prellenado
  const waLink = useMemo(() => {
    if (!data) return "";
    const msg = `Hola, me interesa la ${typology} de ${tower.toUpperCase()} en Alqantar. ¿Podrían enviarme más información?`;
    return `https://wa.me/5493517496383?text=${encodeURIComponent(msg)}`;
  }, [data, tower, typology]);

  // Si no hay data, mostramos el componente "Próximamente"
  if (!data) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-24">
        <FutureUpgrade
          title="Ficha no disponible"
          message="Estamos preparando la información detallada de esta tipología."
          icon="clock"
          size="large"
        />
        <div className="mt-6 text-center">
          <Link
            to="/departamentos"
            className="inline-block rounded-full bg-gray-800 px-5 py-2 text-white transition-colors hover:bg-gray-900"
          >
            Volver a Departamentos
          </Link>
        </div>
      </div>
    );
  }

  // Funciones para el modal de imagen
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-svh bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-40">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Columna principal del contenido */}
          <div className="space-y-8 lg:col-span-8">
            {/* ImageCarousel */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <ImageCarousel 
                images={data.images} 
                onImageClick={handleImageClick}
              />
            </div>

            {/* Descripción */}
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  Descripción
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {data.description}
                </p>
              </div>
            </section>

            {/* Características */}
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                {/* Detalles (bullets) si existen */}
                {data.details?.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-2xl font-semibold text-gray-900">
                      Características
                    </h4>
                    <ul className="space-y-2">
                      {data.details.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="mr-3 mt-2.5 size-2 shrink-0 rounded-full bg-blue-500" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Aside lateral */}
          <aside className="lg:col-span-4">
            <div className={`sticky space-y-4 transition-all duration-300 ease-in-out ${
              isHeaderVisible ? 'top-36' : 'top-4'
            }`}>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h1 className="text-xl font-bold leading-snug text-gray-900 md:text-2xl">
                  {typology}
                </h1>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="text-sm">
                    <div className="text-gray-500">Entrega estimada</div>
                    <div className="font-semibold">Diciembre 2026</div>
                  </div>
                </div>

                {Array.isArray(data.features) && data.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Características
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {data.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div
                            className={`size-8 ${
                              f.color || "bg-gray-600"
                            } flex items-center justify-center rounded-full`}
                          >
                            {/* el icono ya viene en f.icon desde apartmentData */}
                            <f.icon className="size-4 text-white" />
                          </div>
                          <div className="text-left leading-tight">
                            <div className="text-sm font-semibold text-gray-800">
                              {f.value}
                            </div>
                            <div className="text-xs text-gray-500">
                              {f.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-6 space-y-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white transition-colors hover:bg-green-600"
                  >
                    Comunicate para más información
                    <MessageCircleMore size={18} className="opacity-90" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Modal para mostrar imagen completa */}
      {isModalOpen && (
        <MediaDisplay
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mediaItems={data.images}
          initialIndex={selectedImageIndex}
        />
      )}
    </div>
  );
}
