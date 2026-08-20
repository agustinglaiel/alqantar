// src/components/BackgroundSlider.jsx
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';
import Button from './ui/Button';

const IMAGES = [
  '/images/01.webp',
  '/images/02.webp',
  '/images/03.webp',
  '/images/05.webp',
  '/images/06.webp',
  '/images/07.webp',
];

const INTERVAL_DURATION = 5000;

function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Start with only first image in DOM; add more progressively as needed
  const [renderedCount, setRenderedCount] = useState(1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let intervalId = null;

    const advance = () => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % IMAGES.length;
        // Ensure current + next + one-ahead are in the DOM before transitioning
        setRenderedCount((count) => Math.max(count, Math.min(next + 2, IMAGES.length)));
        return next;
      });
    };

    const start = () => {
      if (intervalId !== null) return;
      intervalId = setInterval(advance, INTERVAL_DURATION);
    };
    const stop = () => {
      if (intervalId === null) return;
      clearInterval(intervalId);
      intervalId = null;
    };

    // Pausa el auto-avance cuando la pestaña no está visible: evita seguir
    // animando (y descargando imágenes) en una pestaña de fondo.
    const handleVisibilityChange = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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

      {/* Oscurece la foto para que el texto blanco del hero mantenga contraste
          en cualquiera de las seis fotos del carrusel. */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative flex size-full min-h-svh flex-col justify-center gap-6 px-6 pb-28 pt-32 sm:px-10 md:px-16 lg:px-20">
        <p className="text-overline font-semibold text-white/80 overline">
          Villa Warcalde · Córdoba
        </p>
        <h1 className="max-w-2xl font-display text-display-xl text-white [text-wrap:balance]">
          Alqantar Condominio
        </h1>
        <p className="max-w-prose text-body-l text-white/90">
          Un condominio entre sierras y bosque nativo, a minutos del centro de
          Córdoba: espacio, naturaleza y diseño en Villa Warcalde.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button to="/departamentos" variant="primary" size="lg">
            Ver tipologías
          </Button>
          <Button
            to="/360"
            variant="secondary"
            size="lg"
            className="!border-white !text-white hover:!bg-white hover:!text-ink-900"
          >
            Recorrido 360°
          </Button>
        </div>
      </div>

      <ChevronDown
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 size-8 -translate-x-1/2 text-white/80 motion-safe:animate-bounce"
      />
    </div>
  );
}

export default React.memo(BackgroundSlider);
