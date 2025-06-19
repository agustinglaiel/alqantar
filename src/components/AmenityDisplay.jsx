import React, { useEffect, useRef, useState } from 'react';

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
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className={`flex-1 ${contentClasses}`}>
        <div className="max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          {features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
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
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
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