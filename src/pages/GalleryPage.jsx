import { useState } from "react";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import MediaTile from "../components/media/MediaTile";
import Lightbox from "../components/media/Lightbox";
import Seo from "../components/ui/Seo";
import { whatsappLink } from "../data/project";

// Índices que se destacan ocupando el doble de ancho y alto en la grilla, para
// dar ritmo y sugerir curaduría en vez de una grilla plana de tiles iguales.
const FEATURED_INDICES = new Set([0, 5, 9]);

function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mediaItems = [
    { src: "/images/01.webp", alt: "Fachada de acceso al condominio Alqantar al atardecer, con portón de ingreso vehicular", type: "image" },
    { src: "/images/02.webp", alt: "Vista lateral del edificio con balcones iluminados entre los jardines, al anochecer", type: "image" },
    { src: "/images/03.webp", alt: "Fachada posterior del edificio con jardines paisajísticos y sendero iluminado", type: "image" },
    { src: "/images/04.webp", alt: "Vista panorámica del conjunto de edificios entre los árboles de Villa Warcalde", type: "image" },
    { src: "/images/05.webp", alt: "Acceso vehicular a los edificios iluminado al atardecer", type: "image" },
    { src: "/images/06.webp", alt: "Vista aérea del condominio integrado a la vegetación de Villa Warcalde", type: "image" },
    { src: "/images/07.webp", alt: "Fachada del edificio junto al acceso vehicular en horas del atardecer", type: "image" },
    { src: "/images/08.webp", alt: "Piscina y solárium con deck de madera junto al gimnasio al aire libre", type: "image" },
    { src: "/images/09.webp", alt: "Sendero peatonal entre los edificios rodeado de jardines y un árbol añoso", type: "image" },
    { src: "/images/10.webp", alt: "Terraza con living exterior, quincho y vista a la piscina", type: "image" },
    { src: "/images/11.webp", alt: "Vista aérea del condominio con la piscina, los jardines y los accesos", type: "image" },
    { src: "/images/12.webp", alt: "Vista aérea del conjunto de edificios integrado al paisaje de sierras y bosque", type: "image" },
  ];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Page className="min-h-svh">
      <Seo
        title="Galería"
        description="Fachadas, amenities y el entorno de Alqantar Condominio en Villa Warcalde: un recorrido visual completo por el proyecto."
        path="/galeria"
        ogImage="/images/01.webp"
      />
      <Container className="py-12">
        <PageHeader
          overline="Alqantar"
          title="Galería"
          description="Un recorrido visual por el condominio: fachadas, amenities y el entorno de Villa Warcalde."
          className="mb-10"
        />
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4">
          {mediaItems.map((item, index) => (
            <MediaTile
              key={index}
              src={item.src}
              type={item.type}
              alt={item.alt}
              sizeClassName={`size-full ${FEATURED_INDICES.has(index) ? "col-span-2 row-span-2" : ""}`}
              sizes={
                FEATURED_INDICES.has(index)
                  ? "(min-width: 1024px) 620px, 92vw"
                  : "(min-width: 1280px) 294px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 46vw"
              }
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </Container>
      <Lightbox
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mediaItems={mediaItems}
        initialIndex={selectedImageIndex}
      />
      <Section bg="surface-alt" className="text-center">
        <Container>
          <h2 className="font-display text-h2 text-ink-900">¿Querés verlo en persona?</h2>
          <p className="mx-auto mt-3 max-w-prose text-body-l text-ink-700">
            Coordiná una visita guiada por el condominio con nuestro equipo de asesores.
          </p>
          <Button href={whatsappLink("Hola, me gustaría coordinar una visita a Alqantar.")} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" className="mt-6">
            Coordinar visita por WhatsApp
          </Button>
        </Container>
      </Section>
    </Page>
  );
}

export default GalleryPage;
