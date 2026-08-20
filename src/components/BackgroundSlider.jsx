// src/components/BackgroundSlider.jsx
import React, { useState, useEffect } from 'react';
import ProgressiveImage from './ProgressiveImage';

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
  // Start with only first image in DOM; add more progressively as needed
  const [renderedCount, setRenderedCount] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIdx = (currentIndex + 1) % IMAGES.length;
      // Ensure current + next + one-ahead are in the DOM before transitioning
      setRenderedCount((prev) => Math.max(prev, Math.min(nextIdx + 2, IMAGES.length)));

      setShowOverlay(false);
      setTimeout(() => {
        setCurrentIndex(nextIdx);
        setShowOverlay(true);
      }, OVERLAY_FADE_DURATION);
    }, INTERVAL_DURATION);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="relative min-h-svh overflow-hidden">
      {IMAGES.slice(0, renderedCount).map((src, idx) => (
        <ProgressiveImage
          key={idx}
          src={src}
          alt={idx === 0 ? 'Alqantar condominio' : ''}
          sizes="100vw"
          priority={idx === 0}
          className={`
            absolute inset-0 size-full
            transition-opacity duration-1000 ease-in-out
            ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ))}

      <div className="absolute inset-0 bg-black/20" />

      <img
        src="/images/incomparable.webp"
        alt="Incomparable"
        fetchPriority="high"
        className={`
          absolute left-8 top-1/2 z-10 w-1/3
          max-w-sm -translate-y-1/2
          drop-shadow-2xl transition-opacity duration-500 ease-in-out
          md:left-16 md:max-w-md

          lg:left-20 lg:max-w-lg
          ${showOverlay ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

export default React.memo(BackgroundSlider);
