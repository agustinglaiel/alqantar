// src/pages/AmenitiesPage.jsx
import { useRef, useState } from "react";
import {
  Waves,
  Car,
  Shield,
  Users,
  TreePine,
  Dumbbell,
  Coffee,
  Heart,
  Star,
  Bubbles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import amenitiesData, { amenityCarouselImages } from "../utils/amenitiesData";
import Lightbox from "../components/media/Lightbox";
import MediaTile from "../components/media/MediaTile";
import ProgressiveImage from "../components/ProgressiveImage";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import PageHeader from "../components/ui/PageHeader";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";
import Seo from "../components/ui/Seo";

// Mapeo de iconos por título de amenity.
const ICON_MAP = {
  piscina: Waves,
  gimnasio: Dumbbell,
  sauna: Bubbles,
  "sala de relax": Heart,
  "espacio de coworking": Users,
  "sum privado": Coffee,
  "espacios verdes": TreePine,
  cocheras: Car,
  seguridad: Shield,
};

function getAmenityIcon(title) {
  const key = Object.keys(ICON_MAP).find((k) => title.toLowerCase().includes(k));
  return ICON_MAP[key] ?? Star;
}

const SCROLL_STEP = 320;

function AmenitiesPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollerRef = useRef(null);

  const mediaItems = amenityCarouselImages.map((item) => ({
    src: item.src,
    alt: "Amenities y áreas comunes de Alqantar Condominio",
    type: "image",
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const scrollCarousel = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  };

  return (
    <Page>
      <Seo
        title="Amenities"
        description="Pileta, gimnasio, sauna, SUM y espacios verdes en Alqantar Condominio: la vida social del edificio, a un piso de distancia."
        path="/amenities"
        ogImage="/images/amenities/07.webp"
      />
      <Container className="py-12">
        <PageHeader
          overline="Alqantar"
          title="Amenities"
          description="Pileta, gimnasio, sauna, SUM y espacios verdes: la vida social del condominio, a un piso de distancia."
          className="mb-10"
        />

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {amenityCarouselImages.map((item, index) => (
              <MediaTile
                key={item.src}
                src={item.src}
                alt="Amenities y áreas comunes de Alqantar Condominio"
                sizeClassName="h-64 w-72 shrink-0 snap-center sm:h-72 sm:w-80"
                sizes="320px"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            aria-label="Ver imágenes anteriores"
            className="bg-surface/90 absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full p-2 text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface md:block"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            aria-label="Ver imágenes siguientes"
            className="bg-surface/90 absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full p-2 text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface md:block"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        <Lightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          mediaItems={mediaItems}
          initialIndex={lightboxIndex}
        />
      </Container>

      <Section bg="surface-alt">
        <Container>
          <div className="mb-12 text-center">
            <Overline>Alqantar</Overline>
            <h2 className="mt-3 font-display text-h2 text-ink-900">
              Todo lo que necesitás, sin salir del condominio
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {amenitiesData.map((amenity, index) => {
              const Icon = getAmenityIcon(amenity.title);
              const image = amenityCarouselImages[index % amenityCarouselImages.length]?.src;
              return (
                <div key={amenity.title} className="overflow-hidden rounded-md bg-surface shadow-sm">
                  <ProgressiveImage
                    src={image}
                    alt={`${amenity.title} en Alqantar Condominio`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 47vw, 92vw"
                    className="aspect-[4/3] w-full"
                  />
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <Icon className="size-5 shrink-0 text-accent-600" aria-hidden="true" />
                      <h3 className="text-h3 font-semibold text-ink-900">{amenity.title}</h3>
                    </div>
                    <p className="text-body text-ink-700">{amenity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="text-center">
        <Container>
          <Overline>Antes de tu visita</Overline>
          <h2 className="mt-3 font-display text-h2 text-ink-900">
            Recorré el SUM y el gimnasio en 360°
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-body-l text-ink-700">
            Mirá los espacios sociales de Alqantar como si ya estuvieras ahí, antes de coordinar
            tu visita presencial.
          </p>
          <Button to="/360" variant="primary" size="lg" className="mt-8">
            Ver recorrido 360°
          </Button>
        </Container>
      </Section>
    </Page>
  );
}

export default AmenitiesPage;
