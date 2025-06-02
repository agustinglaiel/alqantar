import { useState, useEffect } from 'react';

function HomePage() {
  const images = [
    '/images/01.png',
    '/images/02.png',
    '/images/03.png',
    '/images/05.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cambia cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [images.length]);

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    />
  );
}

export default HomePage;