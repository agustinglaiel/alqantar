// src/pages/AmenitiesPage.jsx
import { useEffect, useRef, useState } from "react";
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
import amenitiesData, { amenityCarouselImages } from "../data/amenities";
import Lightbox from "../components/media/Lightbox";
import MediaTile from "../components/media/MediaTile";
import IconButton from "../components/ui/IconButton";
import Badge from "../components/ui/Badge";
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

// D17: índice en dos columnas, en vez de una grilla de tarjetas con foto.
const HALF = Math.ceil(amenitiesData.length / 2);
const INDEX_COLUMNS = [amenitiesData.slice(0, HALF), amenitiesData.slice(HALF)];

function AmenitiesPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false });
  const scrollerRef = useRef(null);

  const mediaItems = amenityCarouselImages.map((item) => ({
    src: item.src,
    alt: "Amenities y áreas comunes de Alqantar Condominio",
    type: "image",
  }));

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const updateScrollState = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollState({
        atStart: el.scrollLeft <= 4,
        atEnd: el.scrollLeft >= maxScroll - 4,
      });
      if (maxScroll > 0) {
        setActiveSlide(Math.round((el.scrollLeft / maxScroll) * (amenityCarouselImages.length - 1)));
      }
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

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
            aria-label={`Carrusel de fotos de amenities, imagen ${activeSlide + 1} de ${amenityCarouselImages.length}`}
            className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2"
          >
            {amenityCarouselImages.map((item, index) => (
              <MediaTile
                key={item.src}
                src={item.src}
                alt="Amenities y áreas comunes de Alqantar Condominio"
                sizeClassName="aspect-[4/3] h-64 shrink-0 snap-center sm:h-72"
                imageFit={item.fit ?? "cover"}
                sizes="(min-width: 640px) 384px, 342px"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          {!scrollState.atStart && (
            <IconButton
              onClick={() => scrollCarousel(-1)}
              aria-label="Ver imágenes anteriores"
              variant="surface"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 md:flex"
            >
              <ChevronLeft className="size-6" />
            </IconButton>
          )}
          {!scrollState.atEnd && (
            <IconButton
              onClick={() => scrollCarousel(1)}
              aria-label="Ver imágenes siguientes"
              variant="surface"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:flex"
            >
              <ChevronRight className="size-6" />
            </IconButton>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink-900/70 px-3 py-1 text-caption text-white">
            {activeSlide + 1} / {amenityCarouselImages.length}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {INDEX_COLUMNS.map((column, columnIndex) => (
              <div key={columnIndex} className="divide-y divide-line">
                {column.map((amenity, i) => {
                  const globalIndex = columnIndex === 0 ? i : HALF + i;
                  const Icon = getAmenityIcon(amenity.title);
                  return (
                    <div
                      key={amenity.title}
                      className="group flex items-start gap-4 rounded-md px-2 py-5 transition-all duration-fast hover:bg-surface hover:shadow-sm"
                    >
                      <span className="font-display text-display-l tabular-nums text-gold-500/60 transition-colors duration-fast group-hover:text-gold-500">
                        {String(globalIndex + 1).padStart(2, "0")}
                      </span>
                      <Icon className="mt-2 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-h3 text-ink-900">{amenity.title}</h3>
                          {amenity.metric && <Badge className="shrink-0">{amenity.metric}</Badge>}
                        </div>
                        <p className="mt-1 max-w-prose text-body text-ink-700">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
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
