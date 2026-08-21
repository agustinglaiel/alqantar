import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaTile from './media/MediaTile';
import ProgressiveImage from './ProgressiveImage';
import IconButton from './ui/IconButton';

const MIN_SWIPE_DISTANCE = 50;

function ImageCarousel({ images, aspect = '16/9', onImageClick }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const thumbnailsRef = useRef(null);

  const validImages = Array.isArray(images) && images.length > 0
    ? images
    : [{ src: '/images/default.webp', alt: 'Imagen por defecto' }];

  const aspectStyle = useMemo(() => ({ aspectRatio: aspect }), [aspect]);

  // Centra la miniatura seleccionada en la tira visible.
  const scrollToThumbnail = useCallback((index) => {
    const container = thumbnailsRef.current;
    const thumbnail = container?.children[index];
    if (!container || !thumbnail) return;

    const containerWidth = container.offsetWidth;
    const thumbnailLeft = thumbnail.offsetLeft;
    const thumbnailWidth = thumbnail.offsetWidth;
    const scrollLeft = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToThumbnail(selectedImageIndex);
  }, [selectedImageIndex, scrollToThumbnail]);

  const handleImageClick = (index) => setSelectedImageIndex(index);
  const handlePrevious = () =>
    setSelectedImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  const handleNext = () =>
    setSelectedImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));

  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta > MIN_SWIPE_DISTANCE) handleNext();
    else if (delta < -MIN_SWIPE_DISTANCE) handlePrevious();
    setTouchStartX(null);
  };

  const handleThumbnailsKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (selectedImageIndex + delta + validImages.length) % validImages.length;
    setSelectedImageIndex(nextIndex);
    requestAnimationFrame(() => {
      thumbnailsRef.current?.children[nextIndex]?.focus();
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Área fija con relación de aspecto */}
      <div className="group relative mb-4 w-full overflow-hidden rounded-md bg-white shadow-sm">
        {/* Contenedor con ratio fijo (16:9 por defecto) */}
        <div
          className="relative w-full touch-pan-y"
          style={aspectStyle}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Imagen entra completa. El click para ampliar vive en el <button>
              que la envuelve (no en la imagen directamente) para que sea
              alcanzable por teclado — antes el onClick estaba en un <div>. */}
          <button
            type="button"
            onClick={() => onImageClick && onImageClick(selectedImageIndex)}
            aria-label="Ver imagen ampliada"
            className="absolute inset-0 size-full cursor-pointer"
          >
            <ProgressiveImage
              src={validImages[selectedImageIndex].src}
              alt={validImages[selectedImageIndex].alt || 'Imagen'}
              fit="contain"
              sizes="(min-width: 1024px) 830px, 92vw"
              priority
              className="size-full"
            />
          </button>

          {/* Flechas: siempre visibles en touch (@media hover:none), con
              hover en desktop — antes solo aparecían con mousemove, así que
              en un celular no había ninguna forma de cambiar de imagen (M4). */}
          {validImages.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevious}
                aria-label="Imagen anterior"
                variant="surface"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-fast group-focus-within:opacity-100 group-hover:opacity-100 sm:left-4 [@media(hover:none)]:opacity-100"
              >
                <ChevronLeft className="size-6" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                aria-label="Imagen siguiente"
                variant="surface"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-fast group-focus-within:opacity-100 group-hover:opacity-100 sm:right-4 [@media(hover:none)]:opacity-100"
              >
                <ChevronRight className="size-6" />
              </IconButton>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink-900/70 px-3 py-1 text-caption text-white">
                {selectedImageIndex + 1} / {validImages.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Miniaturas: patrón tablist, sin escalar (el escalado anterior
          desbordaba la tira y la recortaba — #10). La selección se marca
          con un ring, que no cambia el tamaño de la caja. */}
      {validImages.length > 1 && (
        <div
          ref={thumbnailsRef}
          role="tablist"
          aria-label="Miniaturas de la tipología"
          onKeyDown={handleThumbnailsKeyDown}
          className="flex snap-x scroll-px-2 flex-nowrap gap-2 overflow-x-auto overflow-y-visible overscroll-x-contain py-3 lg:gap-4"
        >
          {validImages.map((image, index) => {
            const isSelected = index === selectedImageIndex;
            return (
              <MediaTile
                key={index}
                src={image.src}
                alt={image.alt}
                type="image"
                onClick={() => handleImageClick(index)}
                sizeClassName="aspect-[4/3] h-16 shrink-0 snap-start lg:h-24"
                imageFit="contain"
                sizes="120px"
                className={`rounded-md ring-offset-2 transition-shadow duration-fast ${
                  isSelected ? "ring-2 ring-accent-600" : "hover:ring-2 hover:ring-line"
                }`}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
