import React, { useState } from "react";
import MediaCard from "../components/MediaCard";
import MediaDisplay from "../components/MediaDisplay";

function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mediaItems = [
    { src: "/images/01.png", alt: "Imagen 1", title: "Imagen 1", type: "image" },
    { src: "/images/02.png", alt: "Imagen 2", title: "Imagen 2", type: "image" },
    { src: "/images/03.png", alt: "Imagen 3", title: "Imagen 3", type: "image" },
    { src: "/images/04.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/05.png", alt: "Imagen 5", title: "Imagen 5", type: "image" },
    { src: "/images/06.jpg", alt: "Imagen 6", title: "Imagen 6", type: "image" },
    { src: "/images/07.jpg", alt: "Imagen 7", title: "Imagen 7", type: "image" },
    { src: "/images/08.jpg", alt: "Imagen 8", title: "Imagen 8", type: "image" },
    { src: "/images/09.jpg", alt: "Imagen 9", title: "Imagen 9", type: "image" },
    { src: "/images/10.jpg", alt: "Imagen 10", title: "Imagen 10", type: "image" },
    { src: "/images/11.jpg", alt: "Imagen 11", title: "Imagen 11", type: "image" },
    { src: "/images/12.jpg", alt: "Imagen 12", title: "Imagen 12", type: "image" },
  ];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-screen pt-32">
      <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaItems.map((item, index) => (
            <MediaCard
              key={index}
              src={item.src}
              type={item.type}
              alt={item.alt}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <MediaDisplay
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mediaItems={mediaItems}
          initialIndex={selectedImageIndex}
        />
      )}
    </section>
  );
}

export default GalleryPage;