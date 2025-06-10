import React, { useState } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
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
    { src: "/images/05.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/06.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/07.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/08.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/09.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/10.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/11.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
    { src: "/images/12.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
  ];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-gray-100">
      <BackgroundSlider />
      <div className="max-w-screen-xl mx-auto px-4 mt-12 mb-12">
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