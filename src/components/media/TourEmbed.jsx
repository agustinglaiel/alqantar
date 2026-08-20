import { ExternalLink, X } from "lucide-react";
import Modal from "../ui/Modal";

/**
 * Full-screen Kuula 360° tour embedded in-site via `<Modal>` (D7): keeps the
 * visitor on the site instead of `window.open`ing to kuula.co at their
 * moment of highest interest (fixes B9). "Abrir en pestaña nueva" is offered
 * as a secondary fallback, not the default action.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} [url] - Kuula share URL
 * @param {string} [title]
 */
function TourEmbed({ isOpen, onClose, url, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel={title} className="h-[90vh] w-[95vw] max-w-6xl">
      <div className="relative size-full overflow-hidden rounded-md bg-ink-900 shadow-md">
        {isOpen && url && (
          <iframe
            src={url}
            title={title}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
            allowFullScreen
          />
        )}

        <div className="absolute -right-2 -top-6 flex items-center gap-2 sm:-right-4 sm:-top-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface/90 flex items-center gap-1.5 rounded-full px-3 py-2 text-caption font-medium text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Abrir en pestaña nueva
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-10 items-center justify-center rounded-full bg-surface text-ink-900 shadow-sm transition-colors duration-fast hover:bg-surface-alt"
          >
            <X className="size-6" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default TourEmbed;
