import { useState } from "react";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import MediaTile from "../components/media/MediaTile";
import Lightbox from "../components/media/Lightbox";

function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mediaItems = [
    { src: "/images/01.webp", alt: "Imagen 1", title: "Imagen 1", type: "image" },
    { src: "/images/02.webp", alt: "Imagen 2", title: "Imagen 2", type: "image" },
    { src: "/images/03.webp", alt: "Imagen 3", title: "Imagen 3", type: "image" },
    { src: "/images/04.webp", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/05.webp", alt: "Imagen 5", title: "Imagen 5", type: "image" },
    { src: "/images/06.webp", alt: "Imagen 6", title: "Imagen 6", type: "image" },
    { src: "/images/07.webp", alt: "Imagen 7", title: "Imagen 7", type: "image" },
    { src: "/images/08.webp", alt: "Imagen 8", title: "Imagen 8", type: "image" },
    { src: "/images/09.webp", alt: "Imagen 9", title: "Imagen 9", type: "image" },
    { src: "/images/10.webp", alt: "Imagen 10", title: "Imagen 10", type: "image" },
    { src: "/images/11.webp", alt: "Imagen 11", title: "Imagen 11", type: "image" },
    { src: "/images/12.webp", alt: "Imagen 12", title: "Imagen 12", type: "image" },
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
