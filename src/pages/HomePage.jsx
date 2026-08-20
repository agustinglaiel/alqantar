import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider";
import ContactSection from "../components/ContactSection";
import Perks from "../components/Perks";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import ProgressiveImage from "../components/ProgressiveImage";
import Overline from "../components/ui/Overline";

// Tres bloques narrativos alternados que reemplazan la grilla de accesos
// directos (redundante con el header): cuentan el proyecto en vez de listar
// las páginas del sitio.
const STORY_BLOCKS = [
  {
    overline: "El entorno",
    title: "Villa Warcalde, entre sierras y bosque nativo",
    body: "A minutos del centro de Córdoba, Alqantar está rodeado de arboledas y espacios verdes que marcan el ritmo del día a día: aire libre, silencio y naturaleza a la vuelta de la esquina.",
    image: "/images/09.webp",
    alt: "Sendero peatonal entre los edificios rodeado de jardines y un árbol añoso",
    cta: { label: "Ver ubicación", to: "/ubicacion" },
  },
  {
    overline: "Las unidades",
    title: "Tipologías pensadas para vivir, no solo para habitar",
    body: "Departamentos de 2 y 3 dormitorios con balcones propios, cocinas equipadas y una distribución que separa lo social de lo íntimo. Cada ambiente se prolonga hacia el verde.",
    image: "/images/tipologia01/19.webp",
    alt: "Living con sillones y plantas junto a ventanal corrido al balcón",
    cta: { label: "Ver tipologías", to: "/departamentos" },
  },
  {
    overline: "Los amenities",
    title: "Una vida social completa, sin salir del condominio",
    body: "Pileta, gimnasio, sauna, SUM y espacio de coworking: los amenities de Alqantar están diseñados para el bienestar diario de quienes lo habitan.",
    image: "/images/amenities/07.webp",
    alt: "Piscina y solárium del condominio",
    cta: { label: "Ver amenities", to: "/amenities" },
  },
];

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <Page offset={false}>
      <BackgroundSlider />

      <Section>
        <Container className="flex flex-col gap-16 md:gap-24">
          {STORY_BLOCKS.map((block, index) => (
            <article
              key={block.title}
              className={`flex flex-col items-center gap-8 md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-full md:w-1/2">
                <ProgressiveImage
                  src={block.image}
                  alt={block.alt}
                  sizes="(min-width: 768px) 50vw, 92vw"
                  className="aspect-[4/3] w-full rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Overline>{block.overline}</Overline>
                <h2 className="mt-3 font-display text-h2 text-ink-900">{block.title}</h2>
                <p className="mt-4 max-w-prose text-body-l text-ink-700">{block.body}</p>
                <Button to={block.cta.to} variant="ghost" className="-ml-5 mt-6">
                  {block.cta.label} →
                </Button>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section id="perks" bg="surface-alt">
        <Container>
          <Perks />
        </Container>
      </Section>

      <Section id="contacto">
        <Container>
          <ContactSection />
        </Container>
      </Section>
    </Page>
  );
}

export default HomePage;
