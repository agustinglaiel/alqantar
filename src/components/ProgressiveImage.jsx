import React, { useEffect, useRef, useState } from 'react';
import manifest from '../utils/imageManifest';

const FIT_CLASS = { cover: 'object-cover', contain: 'object-contain' };

const variantPath = (src, width) =>
  `/images/opt/${src.replace(/^\/images\//, '').replace(/\.webp$/i, '')}-${width}.webp`;

/**
 * Imagen con carga progresiva: pinta al instante un placeholder borroso embebido
 * (LQIP del manifest) y hace crossfade a la imagen real cuando termina de bajar.
 * Elige el tamaño con srcset/sizes y reserva el espacio para no producir layout shift.
 *
 * @param {string} src - Ruta original, ej. "/images/01.webp" (clave del manifest)
 * @param {string} sizes - Atributo `sizes`; describe cuánto mide la imagen en pantalla
 * @param {boolean} priority - Carga inmediata + fetchPriority alta (sólo above-the-fold)
 * @param {string} rootMargin - Cuánto antes de entrar en viewport se dispara la descarga
 */
function ProgressiveImage({
  src,
  alt = '',
  sizes = '100vw',
  fit = 'cover',
  priority = false,
  className = '',
  imgClassName = '',
  rootMargin = '400px',
  onClick,
}) {
  const meta = manifest[src];
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (shouldLoad) return;
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad, rootMargin]);

  // Al cambiar de imagen reseteamos el fundido, pero si ya está en caché la damos
  // por cargada en el mismo render para no mostrar un parpadeo del placeholder.
  useEffect(() => {
    const img = imgRef.current;
    setLoaded(Boolean(img?.complete && img.naturalWidth > 0));
  }, [src, shouldLoad]);

  const fitClass = FIT_CLASS[fit] ?? FIT_CLASS.cover;
  // Tailwind emite `.relative` después de `.absolute`, así que no podemos aplicar
  // `relative` a ciegas: pisaría el posicionamiento que pida quien nos usa.
  const positionClass = /\b(absolute|fixed|sticky|static|relative)\b/.test(className)
    ? ''
    : 'relative';

  // Sin entrada en el manifest (imagen nueva sin optimizar) degradamos al <img> simple.
  if (!meta) {
    return (
      <div ref={wrapperRef} onClick={onClick} className={`overflow-hidden ${positionClass} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 size-full ${fitClass} ${imgClassName}`}
        />
      </div>
    );
  }

  const srcSet = meta.v.map((w) => `${variantPath(src, w)} ${w}w`).join(', ');
  const fallbackWidth = meta.v.find((w) => w >= 1200) ?? meta.v.at(-1);

  return (
    <div
      ref={wrapperRef}
      onClick={onClick}
      className={`overflow-hidden ${positionClass} ${className}`}
      style={{ aspectRatio: `${meta.w} / ${meta.h}` }}
    >
      {/* Placeholder borroso: ~400 bytes inline, visible desde el primer frame */}
      <img
        src={meta.b}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 size-full ${fitClass}`}
        style={{
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 700ms ease-out',
        }}
      />

      {shouldLoad && (
        <img
          ref={imgRef}
          src={variantPath(src, fallbackWidth)}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 size-full ${fitClass} ${imgClassName}`}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 700ms ease-out' }}
        />
      )}
    </div>
  );
}

export default ProgressiveImage;
