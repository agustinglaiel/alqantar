import BackgroundSlider from "../components/BackgroundSlider";
import MediaDisplay from "../components/MediaDisplay";

function GalleryPage() {
  const mediaItems = [
    { src: "/images/01.png", alt: "Imagen 1", title: "Imagen 1", type: "image", caption: "Descripción de la imagen 1" },
    { src: "/images/02.png", alt: "Imagen 2", title: "Imagen 2", type: "image", caption: "Descripción de la imagen 2" },
    { src: "/images/03.png", alt: "Imagen 3", title: "Imagen 3", type: "image" },
    { src: "/images/04.png", alt: "Imagen 4", title: "Imagen 4", type: "image" },
  ];

  return (
    <section className=" bg-gray-100">
      <BackgroundSlider />
      <div className="max-w-screen-xl mx-auto px-4 mt-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <MediaDisplay
              key={index}
              src={item.src}
              type={item.type}
              alt={item.alt}
              title={item.title}
              caption={item.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryPage;