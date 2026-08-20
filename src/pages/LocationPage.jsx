import { lazy, Suspense, useState } from "react";
import { MapPin, Milestone, GraduationCap, HeartPulse, ShoppingBag } from "lucide-react";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import PageHeader from "../components/ui/PageHeader";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";
import ProgressiveImage from "../components/ProgressiveImage";
import Seo from "../components/ui/Seo";
import project, { addressFull } from "../data/project";

const InteractiveMap = lazy(() => import("../components/InteractiveMap"));

// Puntos de interés reales de la zona (arregla B6): Villa Warcalde está en el
// noroeste de Córdoba, entre Villa Belgrano/Cerro de las Rosas y el camino a
// La Calera. Tiempos aproximados en auto, redondeados — sin falsa precisión.
const POINTS_OF_INTEREST = [
  { icon: Milestone, category: "Acceso", name: "Av. Rafael Núñez", detail: "Arteria principal hacia el centro de Córdoba", minutes: 5 },
  { icon: Milestone, category: "Acceso", name: "Camino a La Calera", detail: "Salida hacia las sierras y Villa Allende", minutes: 5 },
  { icon: GraduationCap, category: "Educación", name: "Cerro de las Rosas y Villa Belgrano", detail: "Colegios privados y bilingües de la zona", minutes: 10 },
  { icon: HeartPulse, category: "Salud", name: "Cerro de las Rosas", detail: "Clínicas, farmacias y centros de salud", minutes: 10 },
  { icon: ShoppingBag, category: "Comercios", name: "Cerro de las Rosas", detail: "Bares, restaurantes y comercios de barrio", minutes: 10 },
  { icon: MapPin, category: "Centro", name: "Plaza San Martín", detail: "Centro histórico de Córdoba", minutes: 25 },
];

function LocationPage() {
  const [showMap, setShowMap] = useState(false);
  const center = project.coordinates;
  const googleMapsLink = `https://www.google.com/maps?q=${center.lat},${center.lng}`;

  return (
    <Page>
      <Seo
        title="Ubicación"
        description={`Alqantar Condominio está en ${addressFull}: a minutos del centro de Córdoba, entre el arbolado de Villa Belgrano y el camino hacia las sierras.`}
        path="/ubicacion"
        ogImage="/images/06.webp"
      />
      <Container className="py-12">
        <PageHeader overline="Alqantar" title="Ubicación" description={addressFull} className="mb-10" />

        <div className="relative aspect-video w-full overflow-hidden rounded-md shadow-sm">
          {showMap ? (
            <Suspense
              fallback={
                <div className="flex size-full items-center justify-center bg-surface-alt text-body text-ink-500">
                  Cargando mapa…
                </div>
              }
            >
              <InteractiveMap center={center} />
            </Suspense>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-4 border border-line bg-surface-alt p-8 text-center">
              <MapPin className="size-10 text-accent-600" aria-hidden="true" />
              <p className="max-w-sm text-body-l text-ink-700">{addressFull}</p>
              <Button onClick={() => setShowMap(true)} variant="primary">
                Ver mapa interactivo
              </Button>
            </div>
          )}
        </div>
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-caption text-ink-500 underline transition-colors duration-fast hover:text-ink-700"
        >
          Abrir en Google Maps
        </a>
      </Container>

      <Section bg="surface-alt">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <Overline>El barrio</Overline>
            <h2 className="mt-3 font-display text-h2 text-ink-900">Villa Warcalde</h2>
            <p className="mt-4 max-w-prose text-body-l text-ink-700">
              Villa Warcalde es uno de los barrios residenciales del noroeste de Córdoba,
              entre el arbolado de Villa Belgrano y el camino hacia las sierras. A minutos del
              centro por Av. Rafael Núñez, combina la tranquilidad de la ladera con la cercanía
              a la vida urbana de la ciudad.
            </p>
          </div>
          <ProgressiveImage
            src="/images/06.webp"
            alt="Vista aérea del condominio integrado a la vegetación de Villa Warcalde"
            sizes="(min-width: 768px) 50vw, 92vw"
            className="aspect-[4/3] w-full rounded-md"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 text-center">
            <Overline>Alrededores</Overline>
            <h2 className="mt-3 font-display text-h2 text-ink-900">Todo a un viaje corto</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POINTS_OF_INTEREST.map((poi) => {
              const Icon = poi.icon;
              return (
                <div key={`${poi.category}-${poi.name}`} className="rounded-md border border-line bg-surface p-6 shadow-sm">
                  <Icon className="size-5 text-accent-600" aria-hidden="true" />
                  <p className="mt-3 text-caption font-semibold text-ink-500 overline">{poi.category}</p>
                  <p className="mt-1 text-h3 font-semibold text-ink-900">{poi.name}</p>
                  <p className="mt-1 text-body text-ink-700">{poi.detail}</p>
                  <p className="mt-3 text-body font-medium text-accent-600">~{poi.minutes} min en auto</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </Page>
  );
}

export default LocationPage;
