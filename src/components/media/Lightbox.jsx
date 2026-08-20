import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Modal from "../ui/Modal";
import ProgressiveImage from "../ProgressiveImage";

const MIN_SWIPE_DISTANCE = 50;

/**
 * Full-screen media viewer built on `<Modal>`. Replaces MediaDisplay: real
 * `<button>` controls with `aria-label` (not invisible half-image click
 * zones), the image itself is not a navigation target, a screen-reader
 * counter, keyboard arrow navigation, and basic touch swipe.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {{src: string, alt?: string, type?: string}[]} mediaItems
 * @param {number} [initialIndex=0]
 */
function Lightbox({ isOpen, onClose, mediaItems, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const count = mediaItems?.length ?? 0;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  }, [count]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  }, [count]);

  // Correct deps (fixes B7): re-attaches whenever isOpen/count/the handlers
  // themselves change, so this never closes over a stale item count.
  useEffect(() => {
    if (!isOpen || count === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      else if (e.key === "ArrowRight") goToNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, count, goToPrevious, goToNext]);

  // Importante: seguimos renderizando <Modal> aunque isOpen sea false, para
  // que reciba la transición true → false como un re-render normal (no un
  // unmount) — así corre su propio efecto de "restaurar foco al cerrar".
  // Si cortáramos acá con `if (!isOpen) return null`, Modal se desmontaría
  // directamente y ese efecto nunca llegaría a dispararse.
  const currentItem = count > 0 ? mediaItems[currentIndex] : null;
  const isVideo = currentItem?.type?.toLowerCase() === "video";

  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta > MIN_SWIPE_DISTANCE) goToNext();
    else if (delta < -MIN_SWIPE_DISTANCE) goToPrevious();
    setTouchStartX(null);
  };

  return (
    <Modal isOpen={isOpen && count > 0} onClose={onClose} ariaLabel="Visor de imágenes">
      {currentItem && (
      <div
        className="relative h-[80vh] max-h-[90vh] w-[90vw] max-w-5xl sm:h-[85vh] sm:w-[85vw]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex size-full items-center justify-center overflow-hidden rounded-md bg-ink-900">
          {isVideo ? (
            <iframe
              className="size-full"
              src={currentItem.src}
              title={currentItem.alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <ProgressiveImage
              src={currentItem.src}
              alt={currentItem.alt}
              fit="contain"
              sizes="(min-width: 1024px) 1024px, 90vw"
              priority
              className="size-full"
            />
          )}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Imagen anterior"
              className="bg-surface/80 absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface sm:left-4"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Imagen siguiente"
              className="bg-surface/80 absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface sm:right-4"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -right-2 -top-6 flex size-10 items-center justify-center rounded-full bg-surface text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface-alt sm:-right-4 sm:-top-4"
        >
          <X className="size-6" />
        </button>

        <div
          aria-live="polite"
          className="bg-ink-900/70 absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-caption text-white sm:-bottom-8"
        >
          {currentIndex + 1} de {count}
        </div>
      </div>
      )}
    </Modal>
  );
}

export default Lightbox;
