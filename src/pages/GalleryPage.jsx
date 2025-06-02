import SectionWrapper from '../components/SectionWrapper';
import ImageCard from '../components/ImageCard';
import VideoPlayer from '../components/VideoPlayer';

function GalleryPage() {
  // Ejemplo de datos, reemplazar con tus imágenes y videos
  const images = [
    { src: 'https://via.placeholder.com/400x300', alt: 'Imagen 1', caption: 'Descripción de la imagen 1' },
    { src: 'https://via.placeholder.com/400x300', alt: 'Imagen 2', caption: 'Descripción de la imagen 2' },
  ];
  const videos = [
    { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Video 1' },
  ];

  return (
    <SectionWrapper>
      <h2 className="text-4xl font-bold text-center mb-6 cursive">Galería</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <ImageCard key={index} src={image.src} alt={image.alt} caption={image.caption} />
        ))}
        {videos.map((video, index) => (
          <VideoPlayer key={index} src={video.src} title={video.title} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default GalleryPage;