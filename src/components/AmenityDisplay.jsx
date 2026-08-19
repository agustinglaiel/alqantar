import React, { useEffect, useRef, useState } from 'react';
import ProgressiveImage from './ProgressiveImage';

function AmenityDisplay({ 
  title, 
  description, 
  image, 
  imagePosition = 'left', // 'left' o 'right'
  features = []
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Se activa cuando el 20% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Un poco de margen para que se active antes
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const containerClasses = `
    flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 lg:mb-24
    ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}
  `;

  const imageClasses = `
    transform transition-all duration-1000 ease-out
    ${isVisible 
      ? 'translate-x-0 opacity-100' 
      : imagePosition === 'left' 
        ? '-translate-x-20 opacity-0' 
        : 'translate-x-20 opacity-0'
    }
  `;

  const contentClasses = `
    transform transition-all duration-1000 ease-out delay-300
    ${isVisible 
      ? 'translate-x-0 opacity-100' 
      : imagePosition === 'left' 
        ? 'translate-x-20 opacity-0' 
        : '-translate-x-20 opacity-0'
    }
  `;

  return (
    <div ref={elementRef} className={containerClasses}>
      {/* Imagen */}
      <div className={`flex-1 ${imageClasses}`}>
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <ProgressiveImage
            src={image}
            alt={title}
            sizes="(min-width: 1024px) 600px, 92vw"
            className="h-64 w-full lg:h-80"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className={`flex-1 ${contentClasses}`}>
        <div className="max-w-lg">
          <h2 className="mb-6 text-3xl font-bold text-gray-800 lg:text-4xl">
            {title}
          </h2>
          
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            {description}
          </p>

          {features.length > 0 && (
            <div className="space-y-3">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Características destacadas:
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-center text-gray-700"
                    style={{
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.6s ease-out ${0.5 + index * 0.1}s`
                    }}
                  >
                    <span className="mr-3 size-2 rounded-full bg-blue-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AmenityDisplay;