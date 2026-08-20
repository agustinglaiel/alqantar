import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageCircleMore, Rotate3d } from "lucide-react";

import units from "../data/units";
import project, { whatsappLink } from "../data/project";
import iconMap from "../utils/icons";
import ImageCarousel from "../components/ImageCarousel";
import Lightbox from "../components/media/Lightbox";
import FutureUpgrade from "../components/FutureUpgrade";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Seo from "../components/ui/Seo";
import useScrollDirection from "../hooks/useScrollDirection";

// Los 4 datos que más pesan en una decisión de compra van destacados arriba
// del resto de los íconos; el resto (vestidor, lavadero, asador, baulera...)
// se compacta en una lista simple debajo, en vez de una grilla plana de 11
// íconos idénticos.
const FEATURED_LABELS = ["Dormitorios", "Baños", "Cocheras", "Superficie"];

export default function ApartmentDetailPage() {
  const { tower, typology: typParam } = useParams();
  const typology = decodeURIComponent(typParam || "");

  // Visibilidad del header compartida con Header.jsx (mismo hook, mismo umbral),
  // para posicionar el aside sticky justo debajo de él.
  const isHeaderVisible = useScrollDirection({ threshold: 8, minY: 100 });

  // Estados para el modal de imagen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const data = units[tower]?.typologies?.[typology];

  // Tipologías de la misma torre, para la navegación "anterior · siguiente".
  const towerTypologies = Object.keys(units[tower]?.typologies || {});
  const currentIndex = towerTypologies.indexOf(typology);
  const hasSiblings = towerTypologies.length > 1 && currentIndex !== -1;
  const prevTypology = hasSiblings
    ? towerTypologies[(currentIndex - 1 + towerTypologies.length) % towerTypologies.length]
    : null;
  const nextTypology = hasSiblings
    ? towerTypologies[(currentIndex + 1) % towerTypologies.length]
    : null;

  // CTA de WhatsApp con mensaje prellenado
  const waLink = useMemo(() => {
    if (!data) return "";
    const msg = `Hola, me interesa la ${typology} de ${tower.toUpperCase()} en Alqantar. ¿Podrían enviarme más información?`;
    return whatsappLink(msg);
  }, [data, tower, typology]);

  // Si no hay data, mostramos el componente "Próximamente"
  if (!data) {
    return (
      <Page>
        <Seo title="Ficha no disponible" path={`/ficha/${tower}/${encodeURIComponent(typology)}`} />
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

  const featuredFeatures = FEATURED_LABELS.map((label) =>
    data.features?.find((f) => f.label === label)
  ).filter(Boolean);
  const restFeatures = (data.features || []).filter(
    (f) => !FEATURED_LABELS.includes(f.label)
  );

  // Funciones para el modal de imagen
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Page className="min-h-svh bg-surface-alt">
      <Seo
        title={`${typology} — ${data.superficieCubierta} cubiertos`}
        description={`${typology} de Alqantar Condominio: ${data.superficieCubierta} cubiertos, ${data.superficieTotal} totales, en Villa Warcalde, Córdoba.`}
        path={`/ficha/${tower}/${encodeURIComponent(typology)}`}
        ogImage={data.mainImage}
      />
      <Container className="pb-16 pt-8">
        {/* h1 oculto: la jerarquía visual pone el nombre de la tipología en el
            aside (a la derecha en desktop, después del contenido principal en
            el DOM), pero un lector de pantalla debe encontrar el h1 antes que
            los h2 de "Descripción"/"Características". El título visible del
            aside es un <p>, no un heading duplicado (ver más abajo). */}
        <h1 className="sr-only">{typology} — Alqantar Condominio</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Columna principal del contenido */}
          <div className="space-y-8 lg:col-span-8">
            {/* ImageCarousel */}
            <div className="rounded-md border border-line bg-surface p-4 shadow-sm">
              <ImageCarousel
                images={data.images}
                onImageClick={handleImageClick}
              />
            </div>

            {/* Descripción */}
            <section>
              <div className="rounded-md border border-line bg-surface p-6 shadow-sm">
                <h2 className="mb-3 font-display text-h2 text-ink-900">
                  Descripción
                </h2>
                <p className="max-w-prose text-body-l leading-relaxed text-ink-700">
                  {data.description}
                </p>
              </div>
            </section>

            {/* Características */}
            <section>
              <div className="rounded-md border border-line bg-surface p-6 shadow-sm">
                {/* Detalles (bullets) si existen */}
                {data.details?.length > 0 && (
                  <div>
                    <h2 className="mb-3 font-display text-h2 text-ink-900">
                      Características
                    </h2>
                    <ul className="space-y-2">
                      {data.details.map((item, i) => (
                        <li key={i} className="flex items-start text-ink-700">
                          <span className="mr-3 mt-2.5 size-2 shrink-0 rounded-full bg-accent-600" />
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
              <div className="rounded-md border border-line bg-surface p-5 shadow-sm">
                {/* No es un heading: el h1 de la página vive arriba (sr-only)
                    para que el orden de navegación por encabezados quede
                    h1 > h2 > h2, en vez de h2 > h2 > h1. */}
                <p className="font-display text-h2 leading-snug text-ink-900">
                  {typology}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="text-caption">
                    <div className="text-ink-500">Entrega estimada</div>
                    <div className="font-semibold text-ink-900">{project.deliveryDate}</div>
                  </div>
                  {data.superficieCubierta && data.superficieTotal && (
                    <div className="text-caption">
                      <div className="text-ink-500">Superficie</div>
                      <div className="font-semibold text-ink-900">
                        {data.superficieCubierta} cubiertos · {data.superficieTotal} totales
                      </div>
                    </div>
                  )}
                </div>

                {/* 4 datos destacados */}
                {featuredFeatures.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {featuredFeatures.map((f) => {
                      const Icon = iconMap[f.icon];
                      return (
                        <div
                          key={f.label}
                          className="flex items-center gap-3 rounded-md bg-accent-100 p-3"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-600">
                            {Icon && <Icon className="size-4 text-white" />}
                          </div>
                          <div className="text-left leading-tight">
                            <div className="text-body font-semibold text-ink-900">{f.value}</div>
                            <div className="text-caption text-ink-500">{f.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Resto de características, en lista compacta */}
                {restFeatures.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {restFeatures.map((f) => {
                      const Icon = iconMap[f.icon];
                      return (
                        <li key={f.label} className="flex items-center gap-2 text-caption text-ink-700">
                          {Icon && <Icon className="size-4 shrink-0 text-ink-500" aria-hidden="true" />}
                          <span className="text-ink-500">{f.label}</span>
                          <span className="ml-auto font-medium text-ink-900">{f.value}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* CTA */}
                <div className="mt-6 space-y-3">
                  <Button
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Comunicate para más información
                    <MessageCircleMore size={18} className="opacity-90" />
                  </Button>

                  {data.kuulaUrl && (
                    <Button
                      href={data.kuulaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="lg"
                      className="w-full justify-center"
                    >
                      <Rotate3d size={18} />
                      Recorrido 360°
                    </Button>
                  )}
                </div>

                {/* Navegación entre tipologías de la misma torre */}
                {hasSiblings && (
                  <nav
                    aria-label="Otras tipologías de la torre"
                    className="mt-6 flex items-center justify-between border-t border-line pt-4 text-caption"
                  >
                    <Link
                      to={`/ficha/${tower}/${encodeURIComponent(prevTypology)}`}
                      className="flex items-center gap-1 text-ink-700 transition-colors duration-fast hover:text-ink-900"
                    >
                      <ChevronLeft className="size-4" aria-hidden="true" />
                      {prevTypology}
                    </Link>
                    <Link
                      to={`/ficha/${tower}/${encodeURIComponent(nextTypology)}`}
                      className="flex items-center gap-1 text-ink-700 transition-colors duration-fast hover:text-ink-900"
                    >
                      {nextTypology}
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Link>
                  </nav>
                )}
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
