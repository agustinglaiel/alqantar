import { useState } from "react";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import MediaTile from "../components/media/MediaTile";
import Lightbox from "../components/media/Lightbox";

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
    <Page className="min-h-screen">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaItems.map((item, index) => (
            <MediaTile
              key={index}
              src={item.src}
              type={item.type}
              alt={item.alt}
              sizes="(min-width: 1280px) 294px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
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
    </Page>
  );
}

export default GalleryPage;
