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
      
      {/* Optional: Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Incomparable Image Overlay */}
      <img
        src="/images/incomparable.png"
        alt=""
        className="absolute top-1/2 left-8 md:left-16 lg:left-20 transform -translate-y-1/2 w-1/3 max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl z-10"
      />
    </div>
  );
}

export default HomePage;