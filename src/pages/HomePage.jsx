import { useState, useEffect } from 'react';

function HomePage() {
  const images = [
    '/images/01.png',
    '/images/02.png',
    '/images/03.png',
    '/images/05.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Iniciar transición
      setIsTransitioning(true);
      
      // Después de 500ms (mitad de la transición), cambiar la imagen
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 500);
      
      // Después de 1000ms (transición completa), terminar transición
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Incomparable Image Overlay with synchronized fade effect */}
      <img
        src="/images/incomparable.png"
        alt=""
        className={`absolute top-1/2 left-8 md:left-16 lg:left-20 transform -translate-y-1/2 w-1/3 max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl z-10 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}

export default HomePage;