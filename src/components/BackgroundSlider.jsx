// src/components/BackgroundSlider.jsx
import React, { useState, useEffect } from 'react';

const IMAGES = [
  '/images/01.webp',
  '/images/02.webp',
  '/images/03.webp',
  '/images/05.webp',
  '/images/06.webp',
  '/images/07.webp',
];

const INTERVAL_DURATION = 5000;
const OVERLAY_FADE_DURATION = 700;

function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
      setShowOverlay(false);
      setTimeout(() => {
        setShowOverlay(true);
      }, OVERLAY_FADE_DURATION);
    }, INTERVAL_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {IMAGES.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`fondo-${idx}`}
          fetchpriority={idx === 0 ? 'high' : 'low'}
          className={`
            absolute inset-0
            w-full h-full object-cover
            transition-opacity duration-1000 ease-in-out
            ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ objectPosition: 'center center' }}
        />
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-20" />

      <img
        src="/images/incomparable.webp"
        alt="Incomparable"
        fetchpriority="high"
        className={`
          absolute top-1/2 left-8 md:left-16 lg:left-20
          transform -translate-y-1/2
          w-1/3 max-w-sm md:max-w-md lg:max-w-lg
          drop-shadow-2xl z-10

          transition-opacity duration-[500ms] ease-in-out
          ${showOverlay ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

export default React.memo(BackgroundSlider);
