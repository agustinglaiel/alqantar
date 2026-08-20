import { useState } from "react";
import ProgressiveImage from "../components/ProgressiveImage";
import TourEmbed from "../components/media/TourEmbed";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Seo from "../components/ui/Seo";
import units from "../data/units";

// Tours de amenities: no tienen un campo propio en src/data/units.js porque
// no son tipologías, así que quedan acá — son de uso único en esta página.
const AMENITY_TOURS = [
  {
    id: "sum",
    title: "SUM privado",
    image: "/images/amenities/15.webp",
    kuulaUrl: "https://kuula.co/share/collection/7DqTL?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  },
  {
    id: "spa",
    title: "Gimnasio, sauna y sala de relax",
    image: "/images/amenities/03.webp",
    kuulaUrl: "https://kuula.co/share/collection/7DTfh?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  },
];

function ThreeSixtyPage() {
  const [activeTour, setActiveTour] = useState(null);

  // Grilla unificada de tipologías + amenities en un solo nivel (reemplaza
  // el TowerNavigation con "amenities" metido como si fuera una torre):
  // ambas son "cosas con un recorrido 360°".
  const typologyTours = Object.entries(units.torre1?.typologies ?? {}).map(([name, data]) => ({
    id: name,
    title: name,
    image: data.mainImage,
    kuulaUrl: data.kuulaUrl,
  }));

  const tours = [...typologyTours, ...AMENITY_TOURS];

  return (
    <Page>
      <Seo
        title="Recorridos 360°"
        description="Recorré las tipologías de la Torre 1 y los amenities principales de Alqantar Condominio en 360°, como si ya estuvieras ahí."
        path="/360"
      />
      <Container className="py-12">
        <PageHeader
          overline="Alqantar"
          title="Recorridos 360°"
          description="Recorré las tipologías de la Torre 1 y los amenities principales como si ya estuvieras ahí."
          className="mb-10"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <div key={tour.id} className="overflow-hidden rounded-md bg-surface shadow-sm">
              <ProgressiveImage
                src={tour.image}
                alt={`Vista de ${tour.title} de Alqantar Condominio`}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 47vw, 92vw"
                className="aspect-[4/3] w-full"
              />
              <div className="flex flex-col items-center gap-3 p-5 text-center">
                {/* h2, no h3: es el primer nivel de heading debajo del h1 de
                    la página, sin un h2 intermedio que lo preceda. */}
                <h2 className="text-h3 font-semibold text-ink-900">{tour.title}</h2>
                {tour.kuulaUrl ? (
                  <Button onClick={() => setActiveTour(tour)} variant="ghost">
                    Ver recorrido 360° →
                  </Button>
                ) : (
                  // Reemplaza el alert() nativo (B10) por un estado vacío diseñado.
                  <Badge>Próximamente</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <TourEmbed
        isOpen={Boolean(activeTour)}
        onClose={() => setActiveTour(null)}
        url={activeTour?.kuulaUrl}
        title={activeTour ? `Recorrido 360° — ${activeTour.title}` : undefined}
      />
    </Page>
  );
}

export default ThreeSixtyPage;
