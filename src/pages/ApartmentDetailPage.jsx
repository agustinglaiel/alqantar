import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageCircleMore } from "lucide-react";

import apartmentData from "../utils/apartmentData";
import ImageCarousel from "../components/ImageCarousel";
import Lightbox from "../components/media/Lightbox";
import FutureUpgrade from "../components/FutureUpgrade";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import useScrollDirection from "../hooks/useScrollDirection";

export default function ApartmentDetailPage() {
  const { tower, typology: typParam } = useParams();
  const typology = decodeURIComponent(typParam || "");

  // Visibilidad del header compartida con Header.jsx (mismo hook, mismo umbral),
  // para posicionar el aside sticky justo debajo de él.
  const isHeaderVisible = useScrollDirection({ threshold: 8, minY: 100 });

  // Estados para el modal de imagen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const data = apartmentData[tower]?.[typology];

  // CTA de WhatsApp con mensaje prellenado
  const waLink = useMemo(() => {
    if (!data) return "";
    const msg = `Hola, me interesa la ${typology} de ${tower.toUpperCase()} en Alqantar. ¿Podrían enviarme más información?`;
    return `https://wa.me/5493517496383?text=${encodeURIComponent(msg)}`;
  }, [data, tower, typology]);

  // Si no hay data, mostramos el componente "Próximamente"
  if (!data) {
    return (
      <Page>
        <Container className="py-24">
          <FutureUpgrade
            title="Ficha no disponible"
            message="Estamos preparando la información detallada de esta tipología."
            icon="clock"
            size="large"
          />
          <div className="mt-6 text-center">
            <Button to="/departamentos" variant="secondary">
              Volver a Departamentos
            </Button>
          </div>
        </Container>
      </Page>
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
    <Page className="min-h-svh bg-gray-100">
      <Container className="pb-16 pt-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Columna principal del contenido */}
          <div className="space-y-8 lg:col-span-8">
            {/* ImageCarousel */}
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
              <ImageCarousel
                images={data.images}
                onImageClick={handleImageClick}
              />
            </div>

            {/* Descripción */}
            <section>
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  Descripción
                </h2>
                <p className="max-w-prose leading-relaxed text-gray-700">
                  {data.description}
                </p>
              </div>
            </section>

            {/* Características */}
            <section>
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
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
            <div
              className="sticky space-y-4 transition-all duration-base ease-in-out"
              style={{ top: isHeaderVisible ? "calc(var(--header-h) + 1rem)" : "1rem" }}
            >
              <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
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
                  <Button
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                  >
                    Comunicate para más información
                    <MessageCircleMore size={18} className="opacity-90" />
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Modal para mostrar imagen completa */}
      <Lightbox
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mediaItems={data.images}
        initialIndex={selectedImageIndex}
      />
    </Page>
  );
}
