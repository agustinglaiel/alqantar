import { useEffect, useState } from 'react';

/**
 * Hook personalizado para precargar imágenes
 * @param {string[]} imageSrcs - Array de URLs de imágenes a precargar
 * @returns {Object} - { loaded: boolean, errors: string[] }
 */
function useImagePreloader(imageSrcs) {
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!Array.isArray(imageSrcs) || imageSrcs.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageSrcs.length;
    const errorList = [];

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setLoaded(true);
      }
    };

    const handleError = (src) => {
      errorList.push(src);
      loadedCount++;
      if (loadedCount === totalImages) {
        setLoaded(true);
        setErrors(errorList);
      }
    };

    // Precargar cada imagen
    imageSrcs.forEach((src) => {
      const img = new Image();
      img.onload = handleLoad;
      img.onerror = () => handleError(src);
      img.src = src;
    });

    // Cleanup
    return () => {
      // No hay cleanup específico necesario ya que las imágenes se cargan en background
    };
  }, [imageSrcs]);

  return { loaded, errors };
}

export default useImagePreloader;